import { Field, ObjectType, registerEnumType, Int } from '@nestjs/graphql';
import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { ApiProperty } from '@nestjs/swagger';

registerEnumType(CalendarType, {
  name: 'CalendarType'
});

@ObjectType({ description: 'Calendar' })
export class Calendar implements Omit<ICalendarDay, 'userId'> {
  @ApiProperty()
  @Field({ nullable: true })
    date: Date;

  @ApiProperty({ enum: CalendarType, enumName: 'CalendarType' })
  @Field(() => CalendarType, { nullable: true })
    type: CalendarType;

  @ApiProperty()
  @Field(() => Int, { nullable: true })
    time: number;
}
