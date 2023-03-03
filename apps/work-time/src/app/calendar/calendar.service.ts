import {
  SummaryGetByQuery,
  type CalendarCreate, type CalendarDelete, type CalendarGetByDate, type CalendarGetByQuery,
  type CalendarUpdate
} from '@finlab/contracts/work-time';
import { type ICalendarDay, CalendarType, type ICalendarFindByQueryParams } from '@finlab/interfaces/work-time';
import { Time } from '@finlab/helpers';
import { Injectable } from '@nestjs/common';
import { CalendarDayEntity } from './entities/calendar-day.entity';
import { CalendarRepository } from './repositories/calendar.repository';
import { type IDateRange } from '@finlab/interfaces';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRepository: CalendarRepository,
    private readonly rmqService: RMQService
  ) { }

  async create({ userId, date, type }: CalendarCreate.UserIdRequest): Promise<CalendarCreate.Response> {
    const existedCalendarDay = await this.calendarRepository.findByDate(date, userId);
    if (existedCalendarDay) {
      const data = await this.updateType(existedCalendarDay, type);
      return { data };
    }
    const newCalendarDayEntity = new CalendarDayEntity({ userId, date, type });
    const newCalendarDay = await this.calendarRepository.create(newCalendarDayEntity);

    return { data: new CalendarDayEntity(newCalendarDay).entity };
  }

  async update({ userId, date, type }: CalendarUpdate.UserIdRequest): Promise<CalendarUpdate.Response> {
    const existedCalendarDay = await this.calendarRepository.findByDate(date, userId);
    if (!existedCalendarDay) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateType(existedCalendarDay, type);

    return { data };
  }

  async updateType(calendarDay: ICalendarDay, type: CalendarType): Promise<Omit<ICalendarDay, 'userId'>> {
    const calendarEntity = new CalendarDayEntity(calendarDay).updateType(type);
    await this.calendarRepository.update(calendarEntity);

    return calendarEntity.entity;
  }

  async getByQuery(dto: CalendarGetByQuery.UserIdRequest): Promise<CalendarGetByQuery.Response> {
    let range: IDateRange, dates: Date[], summary: SummaryGetByQuery.Response;
    const response: CalendarGetByQuery.Response = { data: [] };
    const { year, month, userId, fillUp, firstDayOfWeek, summary: isSummary } = dto;
    if (year && !month) {
      range = Time.yearRange(year);
      dates = Time.datesInYearRange(year);
    } else {
      range = Time.monthRange(year, month);
      dates = Time.datesInMonthRange(year, month, fillUp, firstDayOfWeek);
    }
    const { from, to } = range;
    const params: ICalendarFindByQueryParams = {
      userId,
      date: {
        $gte: from,
        $lte: to
      }
    };
    const calendar = await this.calendarRepository.findByQuery(params);
    if (isSummary) {
      summary = await this.rmqService.send<SummaryGetByQuery.Request, SummaryGetByQuery.Response>(SummaryGetByQuery.topic, {
        userId, from: from.toISOString(), to: to.toISOString()
      });
    }
    response.data = dates.map(date => {
      const type = calendar.find(day => Time.isSameDay(day.date, date))?.type ?? (Time.isWeekend(date) ? CalendarType.Weekend : CalendarType.WorkingDay);
      const time = summary?.data?.find(day => Time.isSameDay(day.date, date))?.time ?? 0;
      return new CalendarDayEntity({ userId, date, type, time }).entity;
    });
    if (isSummary) {
      response.totalTime = response.data.reduce((sum, { time = 0 }) => sum + time, 0);
    }
    return response;
  }

  async getByDate({ date, userId }: CalendarGetByDate.UserIdRequest): Promise<CalendarGetByDate.Response> {
    const calendarDay = await this.calendarRepository.findByDate(date, userId);
    if (!calendarDay) {
      throw new Error('Unable to show non-existing entry');
    }

    return { data: new CalendarDayEntity(calendarDay).entity };
  }

  async delete({ date, userId }: CalendarDelete.UserIdRequest): Promise<CalendarDelete.Response> {
    const calendarDay = await this.calendarRepository.findByDate(date, userId);
    if (!calendarDay) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.calendarRepository.delete(date, userId);

    return { data: { date } };
  }
}
