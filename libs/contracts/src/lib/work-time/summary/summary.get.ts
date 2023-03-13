import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { ArgsType, Field, ObjectType, Int } from '@nestjs/graphql';
import { type UserId } from '../../common';
import { Summary } from './summary.model';
import { ToBoolean } from '../../decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const SummaryGetTopic = 'work-time.summary.get.query';

@ArgsType()
export class SummaryGetRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    from?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    to?: Date;

  @ApiPropertyOptional()
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
  @Field(() => Int)
    totalTime: number;
}
