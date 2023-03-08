import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { type UserId } from '../../common/user-id';
import { Summary } from './summary.model';

export const SummaryDeleteTopic = 'work-time.summary.delete.command';

@ArgsType()
export class SummaryDeleteRequest {
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;
}

export class SummaryDeleteUserIdRequest {}
export interface SummaryDeleteUserIdRequest extends UserId, SummaryDeleteRequest {}

@ObjectType()
export class SummaryDeleteResponse {
  @Field(() => Summary)
    data: Summary;
}
