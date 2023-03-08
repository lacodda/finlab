import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { type UserId } from '../../common/user-id';
import { Summary } from './summary.model';

export const SummaryCreateTopic = 'work-time.summary.create.command';

@ArgsType()
export class SummaryCreateRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;

  @IsInt()
  @Field()
  @Type(() => Number)
    time: number;
}

export class SummaryCreateUserIdRequest { }
export interface SummaryCreateUserIdRequest extends UserId, SummaryCreateRequest { }

@ObjectType()
export class SummaryCreateResponse {
  @Field(() => Summary)
    data: Summary;
}
