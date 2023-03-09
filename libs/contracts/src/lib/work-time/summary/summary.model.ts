import { Field, ObjectType } from '@nestjs/graphql';
import { type ISummary } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common';

@ObjectType({ description: 'timestamp ' })
export class Summary implements Omit<ISummary, 'userId'> {
  @Field({ nullable: true })
    date: Date;

  @Field(() => Number, { nullable: true })
    time: number;
}

export class SummaryUserId { }
export interface SummaryUserId extends UserId, Summary { }
