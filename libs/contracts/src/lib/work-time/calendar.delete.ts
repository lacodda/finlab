import { type ICalendar } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace CalendarDelete {
  export const topic = 'work-time.calendar.delete.command';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Pick<ICalendar, '_id'>;
  }
}
