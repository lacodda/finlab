import { IsString, IsDateString, IsNumber } from 'class-validator';

export namespace TimestampChangedTotalTime {
  export const topic = 'work-time.timestamp.changed-total-time.event';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      date: string;

    @IsNumber()
      time: number;
  }
}
