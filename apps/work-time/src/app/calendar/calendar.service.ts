import {
  type CalendarCreate, type CalendarDelete, type CalendarGetById, type CalendarGetByQuery,
  type CalendarUpdate
} from '@finlab/contracts/work-time';
import { type ICalendarDay, type ICalendarFindByQueryParams, type CalendarType } from '@finlab/interfaces/work-time';
import { Time } from '@finlab/helpers';
import { Injectable } from '@nestjs/common';
import { CalendarDayEntity } from './entities/calendar-day.entity';
import { CalendarRepository } from './repositories/calendar.repository';
import { CalendarEventEmitter } from './calendar.event-emitter';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRepository: CalendarRepository,
    private readonly calendarEventEmitter: CalendarEventEmitter
  ) { }

  async create(dto: CalendarCreate.Request): Promise<CalendarCreate.Response> {
    const date = new Date(dto.date);
    const existedCalendarDay = await this.calendarRepository.findByDate(date, dto.userId);
    if (existedCalendarDay) {
      const data = await this.updateType(existedCalendarDay, dto.type);
      return { data };
    }
    const newCalendarDayEntity = new CalendarDayEntity({ ...dto, date });
    const newCalendarDay = await this.calendarRepository.create(newCalendarDayEntity);
    await this.calendarEventEmitter.handle(newCalendarDayEntity);

    return { data: new CalendarDayEntity(newCalendarDay).entity };
  }

  async update(dto: CalendarUpdate.Request): Promise<CalendarUpdate.Response> {
    const existedCalendarDay = await this.calendarRepository.findById(dto.id);
    if (!existedCalendarDay) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateType(existedCalendarDay, dto.type);

    return { data };
  }

  async updateType(calendarDay: ICalendarDay, type: CalendarType): Promise<Omit<ICalendarDay, 'userId'>> {
    const calendarEntity = new CalendarDayEntity(calendarDay).updateType(type);
    await this.calendarRepository.update(calendarEntity);
    await this.calendarEventEmitter.handle(calendarEntity);

    return calendarEntity.entity;
  }

  async getByQuery(dto: CalendarGetByQuery.Request): Promise<CalendarGetByQuery.Response> {
    console.log('dto', dto);
    // const dayRange = Time.dayRangeISO(dto.date);
    // const fillUp = (dto.fillUp as unknown as string) === 'true';

    // const params: ICalendarFindByQueryParams = {
    //   userId: dto.userId,
    //   date: {
    //     $gte: dayRange.from,
    //     $lte: dayRange.to
    //   }
    // };

    // const calendarArray = await this.calendarRepository.findByQuery(params);
    // const calendarsEntity = new CalendarsEntity(calendarArray, MIN_BREAK_TIME);

    // if (raw) {
    //   const { calendars: data, workTime, breaks, totalTime } = calendarsEntity.result();
    //   return { data, workTime, breaks, totalTime };
    // }

    // const { calendars: data, workTime, breaks, totalTime } = calendarsEntity.process().result();

    // return { data, workTime, breaks, totalTime };
    return { data: [] };
  }

  async getById(dto: CalendarGetById.Request): Promise<CalendarGetById.Response> {
    const existedCalendarDay = await this.calendarRepository.findById(dto.id);
    if (!existedCalendarDay) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new CalendarDayEntity(existedCalendarDay).entity };
  }

  async delete(dto: CalendarDelete.Request): Promise<CalendarDelete.Response> {
    const existedCalendarDay = await this.calendarRepository.findById(dto.id);
    if (!existedCalendarDay) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.calendarRepository.delete(dto.id);
    await this.calendarEventEmitter.handle(new CalendarDayEntity(existedCalendarDay).updateTime(0));

    return { data: { _id: existedCalendarDay._id } };
  }
}
