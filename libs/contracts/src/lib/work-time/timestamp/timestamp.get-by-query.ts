import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common/user-id';
import ToBoolean from '../../decorators/to-boolean.decorator';

export const TimestampGetByQueryTopic = 'work-time.timestamp.get-by-query.query';

@ArgsType()
export class TimestampGetByQueryRequest {
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

export class TimestampGetByQueryUserIdRequest {}
export interface TimestampGetByQueryUserIdRequest extends UserId, TimestampGetByQueryRequest {}

@ObjectType()
export class TimestampGetByQueryResponse {
  @Field(() => [Timestamp])
    data: Timestamp[];

  @Field(() => [Number])
    workTime: number[];

  @Field(() => [Number])
    breaks: number[];

  @Field()
    totalTime: number;
}
