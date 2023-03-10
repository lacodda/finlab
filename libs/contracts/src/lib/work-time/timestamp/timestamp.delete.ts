import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { type UserId } from '../../common';
import { Timestamp } from './timestamp.model';

export const TimestampDeleteTopic = 'work-time.timestamp.delete.command';

@ArgsType()
export class TimestampDeleteRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    timestamp: Date;
}

export class TimestampDeleteUserIdRequest {}
export interface TimestampDeleteUserIdRequest extends UserId, TimestampDeleteRequest {}

@ObjectType()
export class TimestampDeleteResponse {
  @ApiProperty({ type: Timestamp })
  @Field(() => Timestamp)
    data: Timestamp;
}
