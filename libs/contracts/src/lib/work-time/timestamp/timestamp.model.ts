import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { type ITimestamp, TimestampType } from '@finlab/interfaces/work-time';
import { ApiProperty } from '@nestjs/swagger';

registerEnumType(TimestampType, {
  name: 'TimestampType'
});

@ObjectType({ description: 'Timestamp' })
export class Timestamp implements Omit<ITimestamp, 'userId'> {
  @ApiProperty()
  @Field({ nullable: true })
    timestamp: Date;

  @ApiProperty({ enum: TimestampType, enumName: 'TimestampType' })
  @Field(() => TimestampType, { nullable: true })
    type: TimestampType;
}
