import { IsDateString, IsNumber } from 'class-validator';
import { type UserId } from '../../common/user-id';

export namespace CalendarChanged {
  export const topic = 'work-time.calendar.changed.event';

  export class Request {
    @IsDateString()
      date: string;

    @IsNumber()
      time: number;
  }

  export class UserIdRequest {}
  export interface UserIdRequest extends UserId, Request {}
}
