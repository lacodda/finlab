import { IsString, IsDateString } from 'class-validator';

export namespace TimestampChanged{
  export const topic = 'work-time.timestamp.changed.event';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      timestamp: string;
  }
}
