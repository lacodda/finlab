import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { type ITimestamp, TimestampType } from '@finlab/interfaces/work-time';

registerEnumType(TimestampType, {
  name: 'TimestampType'
});

@ObjectType({ description: 'timestamp ' })
export class Timestamp implements Omit<ITimestamp, 'userId'> {
  @Field({ nullable: true })
    timestamp: Date;

  @Field(() => TimestampType, { nullable: true })
    type: TimestampType;
}
