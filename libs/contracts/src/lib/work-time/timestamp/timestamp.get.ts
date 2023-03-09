import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common';
import { ToBoolean } from '../../decorators';

export const TimestampGetTopic = 'work-time.timestamp.get.query';

@ArgsType()
export class TimestampGetRequest {
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    date?: Date;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    raw?: boolean;
}

export class TimestampGetUserIdRequest {}
export interface TimestampGetUserIdRequest extends UserId, TimestampGetRequest {}

@ObjectType()
export class TimestampGetResponse {
  @Field(() => [Timestamp])
    data: Timestamp[];

  @Field(() => [Number])
    workTime: number[];

  @Field(() => [Number])
    breaks: number[];

  @Field()
    totalTime: number;
}
