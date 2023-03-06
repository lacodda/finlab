import { type ITimestamp } from '@finlab/interfaces/work-time';
import { IsString, IsOptional, IsDateString, IsBooleanString } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Timestamp } from './timestamp.model';

export namespace TimestampGetByQuery {
  export const topic = 'work-time.timestamp.get-by-query.query';

  @ArgsType()
  export class Request {
    @IsString()
    @Field()
      userId: string;

    @IsOptional()
    @IsDateString()
    @Field({ nullable: true })
      date?: string;

    @IsOptional()
    @IsBooleanString()
    @Field(() => Boolean, { nullable: true })
      raw?: boolean;
  }

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
