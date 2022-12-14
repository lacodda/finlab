import { ITimestamp, TimestampType } from '@finlab/interfaces';
import { IsString, IsDateString } from 'class-validator';

export namespace WorkTimeTimestampCreate {
  export const topic = 'work-time.timestamp-create.command';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      timestamp: string;

    @IsString()
      type: TimestampType;
  }

  export class Response {
    data: Omit<ITimestamp, 'userId'>;
  }
}
