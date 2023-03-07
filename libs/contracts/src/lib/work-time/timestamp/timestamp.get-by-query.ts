import { type ITimestamp } from '@finlab/interfaces/work-time';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Timestamp } from './timestamp.model';
import { type UserId } from '../../common/user-id';
import { Type } from 'class-transformer';
import ToBoolean from '../../decorators/to-boolean.decorator';

export namespace TimestampGetByQuery {
  export const topic = 'work-time.timestamp.get-by-query.query';

  @ArgsType()
  export class Request {
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

  export class UserIdRequest {}
  export interface UserIdRequest extends UserId, Request {}

  @ObjectType()
  export class Response {
    @Field(() => [Timestamp])
      data: Timestamp[];

    @Field(() => [Number])
      workTime: number[];

    @Field(() => [Number])
      breaks: number[];

    @Field()
      totalTime: number;
  }
}

export class TimestampGetByQueryResponse {
  data: Array<Omit<ITimestamp, 'userId'>>;
}
