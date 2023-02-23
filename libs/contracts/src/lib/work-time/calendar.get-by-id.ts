import { type ICalendar } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace CalendarGetById {
  export const topic = 'work-time.calendar.get-by-id.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Omit<ICalendar, 'userId'>;
  }
}
