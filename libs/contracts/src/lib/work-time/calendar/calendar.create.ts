import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CalendarType } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Calendar } from './calendar.model';

export const CalendarCreateTopic = 'work-time.calendar.create.command';

@ArgsType()
export class CalendarCreateRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;

  @ApiProperty({ enum: CalendarType, enumName: 'CalendarType' })
  @IsEnum(CalendarType)
  @Field(() => CalendarType)
    type: CalendarType;
}

export class CalendarCreateUserIdRequest {}
export interface CalendarCreateUserIdRequest extends UserId, CalendarCreateRequest {}

@ObjectType()
export class CalendarCreateResponse {
  @ApiProperty({ type: Calendar })
  @Field(() => Calendar)
    data: Calendar;
}
