import { Field, ObjectType } from '@nestjs/graphql';
import { type ISummary } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Summary' })
export class Summary implements Omit<ISummary, 'userId'> {
  @ApiProperty()
  @Field({ nullable: true })
    date: Date;

  @ApiProperty()
  @Field(() => Number, { nullable: true })
    time: number;
}

export class SummaryUserId { }
export interface SummaryUserId extends UserId, Summary { }
