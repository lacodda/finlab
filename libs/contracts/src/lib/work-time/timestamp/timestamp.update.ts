import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampType } from '@finlab/interfaces/work-time';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common';

export const TimestampUpdateTopic = 'work-time.timestamp.update.command';

@ArgsType()
export class TimestampUpdateRequestParam {
  @IsDate()
  @Field()
  @Type(() => Date)
    timestamp: Date;
}

@ArgsType()
export class TimestampUpdateRequestBody {
  @IsEnum(TimestampType)
  @Field(() => TimestampType)
    type: TimestampType;
}

export class TimestampUpdateUserIdRequest { }
export interface TimestampUpdateUserIdRequest extends UserId, TimestampUpdateRequestParam, TimestampUpdateRequestBody { }

@ObjectType()
export class TimestampUpdateResponse {
  @ApiProperty()
  @Field(() => Timestamp)
    data: Timestamp;
}
