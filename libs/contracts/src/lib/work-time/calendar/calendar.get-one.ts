import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { type ICalendarDay } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common';

export const CalendarGetOneTopic = 'work-time.calendar.get-one.query';

export class CalendarGetOneRequest {
  @IsDate()
  @Type(() => Date)
    date: Date;
}

export class CalendarGetOneUserIdRequest {}
export interface CalendarGetOneUserIdRequest extends UserId, CalendarGetOneRequest {}

export class CalendarGetOneResponse {
  data: Omit<ICalendarDay, 'userId'>;
}
