import { type ICalendarDay, type ICalendarFindByQueryParams } from '@finlab/interfaces/work-time';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type UpdateWriteOpResult } from 'mongoose';
import { type CalendarDayEntity } from '../entities/calendar-day.entity';
import { CalendarDay } from '../models/calendar-day.model';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectModel(CalendarDay.name) private readonly calendarModel: Model<CalendarDay>
  ) { }

  async create(calendar: CalendarDayEntity): Promise<ICalendarDay> {
    try {
      // eslint-disable-next-line new-cap
      const newCalendar = new this.calendarModel(calendar);
      return await newCalendar.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ date, ...rest }: CalendarDayEntity): Promise<UpdateWriteOpResult> {
    try {
      return await this.calendarModel.updateOne({ date }, { $set: { ...rest } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<ICalendarDay> {
    try {
      return await this.calendarModel.findById(id).exec() as ICalendarDay;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByQuery(params: ICalendarFindByQueryParams): Promise<ICalendarDay> {
    try {
      return await this.calendarModel.findOne(params).exec() as ICalendarDay;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByQuery(params: ICalendarFindByQueryParams): Promise<ICalendarDay[]> {
    try {
      return await this.calendarModel.find(params).sort({ date: 1 }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByDate(date: Date, userId: string): Promise<ICalendarDay> {
    try {
      return await this.calendarModel.findOne({ date, userId }).exec() as ICalendarDay;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.calendarModel.deleteOne({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
