import { IsOptional, IsBoolean, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { FirstDayOfWeek } from '@finlab/interfaces';
import { type UserId } from '../../common';
import { ArgsType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { ToBoolean } from '../../decorators';
import { Calendar } from './calendar.model';

registerEnumType(FirstDayOfWeek, {
  name: 'FirstDayOfWeek'
});

const currentYear = new Date().getFullYear();
const MIN_YEAR = currentYear - 1;
const MAX_YEAR = currentYear + 10;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

export const CalendarGetTopic = 'work-time.calendar.get.query';

@ArgsType()
export class CalendarGetRequest {
  @ApiProperty()
  @IsOptional()
  @Max(MAX_YEAR)
  @Min(MIN_YEAR)
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
    year?: number;

  @ApiProperty()
  @IsOptional()
  @Max(MAX_MONTH)
  @Min(MIN_MONTH)
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
    month?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    fillUp?: boolean;

  @ApiProperty({ enum: FirstDayOfWeek, enumName: 'FirstDayOfWeek' })
  @IsOptional()
  @IsEnum(FirstDayOfWeek)
  @Field(() => FirstDayOfWeek, { nullable: true })
    firstDayOfWeek?: FirstDayOfWeek;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    summary?: boolean;
}

export class CalendarGetUserIdRequest {}
export interface CalendarGetUserIdRequest extends UserId, CalendarGetRequest {}

@ObjectType()
export class CalendarGetResponse {
  @ApiProperty({ type: [Calendar] })
  @Field(() => [Calendar])
    data: Calendar[];

  @ApiProperty()
  @Field({ nullable: true })
    totalTime?: number;
}
