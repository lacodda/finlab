import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { type UserId } from '../../common/user-id';
import { Summary } from './summary.model';

export const SummaryRecalculateTopic = 'work-time.summary.recalculate.command';

@ArgsType()
export class SummaryRecalculateRequest {
  @IsDate()
  @Field()
  @Type(() => Date)
    from: Date;

  @IsDate()
  @Field()
  @Type(() => Date)
    to: Date;
}

export class SummaryRecalculateUserIdRequest { }
export interface SummaryRecalculateUserIdRequest extends UserId, SummaryRecalculateRequest { }

@ObjectType()
export class SummaryRecalculateResponse {
  @Field(() => [Summary])
    data: Summary[];

  @Field()
    totalTime: number;
}
