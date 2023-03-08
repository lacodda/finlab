import { IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampType } from '@finlab/interfaces/work-time';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common/user-id';

export const TimestampCreateTopic = 'work-time.timestamp.create.command';
@ArgsType()
export class TimestampCreateRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    timestamp: Date;

  @ApiProperty()
  @IsEnum(TimestampType)
  @Field(() => TimestampType)
    type: TimestampType;
}

export class TimestampCreateUserIdRequest {}
export interface TimestampCreateUserIdRequest extends UserId, TimestampCreateRequest {}

@ObjectType()
export class TimestampCreateResponse {
  @ApiProperty()
  @Field(() => Timestamp, { nullable: true })
    data: Timestamp;
}
