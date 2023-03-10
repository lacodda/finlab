import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common';
import { ToBoolean } from '../../decorators';
import { ApiProperty } from '@nestjs/swagger';

export const TimestampGetTopic = 'work-time.timestamp.get.query';

@ArgsType()
export class TimestampGetRequest {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    date?: Date;

  @ApiProperty()
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
  @ApiProperty({ type: [Timestamp] })
  @Field(() => [Timestamp])
    data: Timestamp[];

  @ApiProperty({ type: [Number] })
  @Field(() => [Number])
    workTime: number[];

  @ApiProperty({ type: [Number] })
  @Field(() => [Number])
    breaks: number[];

  @ApiProperty()
  @Field()
    totalTime: number;
}
