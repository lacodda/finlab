import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';
import { type Id } from '../../common/id';

export namespace CalendarUpdate {
  export const topic = 'work-time.calendar.update.command';

  export class Request {
    @IsOptional()
    @IsDateString()
      date: string;

    @IsOptional()
    @IsString()
    @IsEnum(CalendarType)
      type: CalendarType;
  }

  export class IdRequest {}
  export interface IdRequest extends Id, Request {}

  export class Response {
    data: Omit<ICalendarDay, 'userId'>;
  }
}
