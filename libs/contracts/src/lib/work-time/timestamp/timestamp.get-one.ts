import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { type UserId } from '../../common/user-id';
import { Timestamp } from './timestamp.model';

export const TimestampGetOneTopic = 'work-time.timestamp.get-one.query';

@ArgsType()
export class TimestampGetOneRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    timestamp: Date;
}

export class TimestampGetOneUserIdRequest {}
export interface TimestampGetOneUserIdRequest extends UserId, TimestampGetOneRequest {}

@ObjectType()
export class TimestampGetOneResponse {
  @Field(() => Timestamp)
    data: Timestamp;
}
