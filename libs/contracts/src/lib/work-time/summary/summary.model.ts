import { Field, ObjectType } from '@nestjs/graphql';
import { type ISummary } from '@finlab/interfaces/work-time';

@ObjectType({ description: 'timestamp ' })
export class Summary implements Omit<ISummary, 'userId'> {
  @Field({ nullable: true })
    date: Date;

  @Field(() => Number, { nullable: true })
    time: number;
}
