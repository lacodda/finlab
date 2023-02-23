import { IsString, IsDateString, IsNumber } from 'class-validator';

export namespace CalendarChanged {
  export const topic = 'work-time.calendar.changed.event';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      date: string;

    @IsNumber()
      time: number;
  }
}
