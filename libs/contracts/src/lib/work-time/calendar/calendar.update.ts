import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { type UserId } from '../../common/user-id';

export namespace CalendarUpdate {
  export const topic = 'work-time.calendar.update.command';

  export class RequestParam {
    @IsDate()
    @Type(() => Date)
      date: Date;
  }

  export class RequestBody {
    @IsEnum(CalendarType)
      type: CalendarType;
  }

  export class UserIdRequest { }
  export interface UserIdRequest extends UserId, RequestParam, RequestBody { }

  export class Response {
    data: Omit<ICalendarDay, 'userId'>;
  }
}
