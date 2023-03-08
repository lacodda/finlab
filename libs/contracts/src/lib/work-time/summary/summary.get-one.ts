import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { type UserId } from '../../common/user-id';
import { Summary } from './summary.model';

export const SummaryGetOneTopic = 'work-time.summary.get-one.query';

@ArgsType()
export class SummaryGetOneRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;
}

export class SummaryGetOneUserIdRequest {}
export interface SummaryGetOneUserIdRequest extends UserId, SummaryGetOneRequest {}

@ObjectType()
export class SummaryGetOneResponse {
  @Field(() => Summary)
    data: Summary;
}
