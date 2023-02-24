import { type ITimestamp, TimestampType } from '@finlab/interfaces/work-time';
import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';

export namespace TimestampUpdate {
  export const topic = 'work-time.timestamp.update.command';

  export class Request {
    @IsString()
      id: string;

    @IsOptional()
    @IsDateString()
      timestamp: string;

    @IsOptional()
    @IsString()
    @IsEnum(TimestampType)
      type: TimestampType;
  }

  export class Response {
    data: Omit<ITimestamp, 'userId'>;
  }
}
