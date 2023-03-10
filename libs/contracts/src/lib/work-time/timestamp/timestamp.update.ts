import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampType } from '@finlab/interfaces/work-time';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common';

export const TimestampUpdateTopic = 'work-time.timestamp.update.command';

export class TimestampUpdateRequestParam {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
    timestamp: Date;
}

export class TimestampUpdateRequestBody {
  @ApiProperty({ enum: TimestampType, enumName: 'TimestampType' })
  @IsEnum(TimestampType)
    type: TimestampType;
}

export class TimestampUpdateUserIdRequest { }
export interface TimestampUpdateUserIdRequest extends UserId, TimestampUpdateRequestParam, TimestampUpdateRequestBody { }

export class TimestampUpdateResponse {
  @ApiProperty({ type: Timestamp })
    data: Timestamp;
}
