import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { type UserId } from '../../common';
import { Summary } from './summary.model';
import { ToBoolean } from '../../decorators';
import { ApiProperty } from '@nestjs/swagger';

export const SummaryGetTopic = 'work-time.summary.get.query';

@ArgsType()
export class SummaryGetRequest {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    from?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    to?: Date;

  @ApiProperty()
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
  @ApiProperty({ type: [Summary] })
  @Field(() => [Summary])
    data: Summary[];

  @ApiProperty()
  @Field()
    totalTime: number;
}
