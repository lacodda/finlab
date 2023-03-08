import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { type ICalendarDay } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common/user-id';

export const CalendarDeleteTopic = 'work-time.calendar.delete.command';

export class CalendarDeleteRequest {
  @IsDate()
  @Type(() => Date)
    date: Date;
}

export class CalendarDeleteUserIdRequest {}
export interface CalendarDeleteUserIdRequest extends UserId, CalendarDeleteRequest {}

export class CalendarDeleteResponse {
  data: Pick<ICalendarDay, 'date'>;
}
