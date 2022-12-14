import { ITimestamp, TimestampType } from '@finlab/interfaces';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export namespace WorkTimeTimestampUpdate {
  export const topic = 'work-time.timestamp-update.command';

  export class Request {
    @IsString()
      id: string;

    @IsOptional()
    @IsDateString()
      timestamp: string;

    @IsOptional()
    @IsString()
      type: TimestampType;
  }

  export class Response {
    data: Omit<ITimestamp, 'userId'>;
  }
}
