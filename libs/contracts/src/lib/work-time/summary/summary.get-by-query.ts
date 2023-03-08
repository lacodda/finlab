import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { type UserId } from '../../common/user-id';
import { Summary } from './summary.model';

export const SummaryGetByQueryTopic = 'work-time.summary.get-by-query.query';

@ArgsType()
export class SummaryGetByQueryRequest {
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    from?: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    to?: Date;
}

export class SummaryGetByQueryUserIdRequest { }
export interface SummaryGetByQueryUserIdRequest extends UserId, SummaryGetByQueryRequest { }

@ObjectType()
export class SummaryGetByQueryResponse {
  @Field(() => [Summary])
    data: Summary[];

  @Field()
    totalTime: number;
}
