import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';

export namespace CalendarUpdate {
  export const topic = 'work-time.calendar.update.command';

  export class Request {
    @IsString()
      id: string;

    @IsOptional()
    @IsDateString()
      date: string;

    @IsOptional()
    @IsString()
    @IsEnum(CalendarType)
      type: CalendarType;
  }

  export class Response {
    data: Omit<ICalendarDay, 'userId'>;
  }
}
