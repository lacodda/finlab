import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { type UserId } from '../../common';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Calendar } from './calendar.model';

export const CalendarDeleteTopic = 'work-time.calendar.delete.command';

@ArgsType()
export class CalendarDeleteRequest {
  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;
}

export class CalendarDeleteUserIdRequest {}
export interface CalendarDeleteUserIdRequest extends UserId, CalendarDeleteRequest {}

@ObjectType()
export class CalendarDeleteResponse {
  @ApiProperty({ type: Calendar })
  @Field(() => Calendar)
    data: Calendar;
}
