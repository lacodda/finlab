import { type ICalendarDay } from '@finlab/interfaces/work-time';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { type UserId } from '../../common/user-id';

export namespace CalendarDelete {
  export const topic = 'work-time.calendar.delete.command';

  export class Request {
    @IsDate()
    @Type(() => Date)
      date: Date;
  }

  export class UserIdRequest {}
  export interface UserIdRequest extends UserId, Request {}

  export class Response {
    data: Pick<ICalendarDay, 'date'>;
  }
}
