import { type ICalendar } from '@finlab/interfaces/work-time';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export namespace CalendarGetByQuery {
  export const topic = 'work-time.calendar.get-by-query.query';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsDateString()
      date?: string;
  }

  export class Response {
    data: Array<Omit<ICalendar, 'userId'>>;
  }
}
