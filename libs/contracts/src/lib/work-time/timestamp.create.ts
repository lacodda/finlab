import { type ITimestamp, TimestampType } from '@finlab/interfaces/work-time';
import { IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace TimestampCreate {
  export const topic = 'work-time.timestamp.create.command';

  export class Request {
    @ApiProperty()
    @IsString()
      userId: string;

    @ApiProperty()
    @IsDateString()
      timestamp: string;

    @ApiProperty()
    @IsString()
    @IsEnum(TimestampType)
      type: TimestampType;
  }

  export class Response {
    @ApiProperty()
      data: Omit<ITimestamp, 'userId'>;
  }
}
