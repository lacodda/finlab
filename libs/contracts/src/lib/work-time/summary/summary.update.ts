import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { type UserId } from '../../common/user-id';
import { Summary } from './summary.model';

export const SummaryUpdateTopic = 'work-time.summary.update.command';

@ArgsType()
export class SummaryUpdateRequestParam {
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;
}

@ArgsType()
export class SummaryUpdateRequestBody {
  @IsInt()
  @Field()
  @Type(() => Number)
    time: number;
}

export class SummaryUpdateUserIdRequest { }
export interface SummaryUpdateUserIdRequest extends UserId, SummaryUpdateRequestParam, SummaryUpdateRequestBody { }

@ObjectType()
export class SummaryUpdateResponse {
  @Field(() => Summary)
    data: Summary;
}
