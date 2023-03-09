import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { type UserId } from '../../common';
import { Summary } from './summary.model';
import { ToBoolean } from '../../decorators';

export const SummaryGetTopic = 'work-time.summary.get.query';

@ArgsType()
export class SummaryGetRequest {
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

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    recalculate?: boolean;
}

export class SummaryGetUserIdRequest { }
export interface SummaryGetUserIdRequest extends UserId, SummaryGetRequest { }

@ObjectType()
export class SummaryGetResponse {
  @Field(() => [Summary])
    data: Summary[];

  @Field()
    totalTime: number;
}
