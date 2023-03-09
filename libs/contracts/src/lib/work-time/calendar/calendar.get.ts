import { IsOptional, IsBoolean, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { type ICalendarDay } from '@finlab/interfaces/work-time';
import { FirstDayOfWeek } from '@finlab/interfaces';
import { type UserId } from '../../common';

const currentYear = new Date().getFullYear();
const MIN_YEAR = currentYear - 1;
const MAX_YEAR = currentYear + 10;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

export const CalendarGetTopic = 'work-time.calendar.get.query';

export class CalendarGetRequest {
  @IsOptional()
  @Max(MAX_YEAR)
  @Min(MIN_YEAR)
  @IsInt()
  @Type(() => Number)
    year?: number;

  @IsOptional()
  @Max(MAX_MONTH)
  @Min(MIN_MONTH)
  @IsInt()
  @Type(() => Number)
    month?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
    fillUp?: boolean;

  @IsOptional()
  @IsEnum(FirstDayOfWeek)
  @Type(() => Number)
    firstDayOfWeek?: FirstDayOfWeek;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
    summary?: boolean;
}

export class CalendarGetUserIdRequest {}
export interface CalendarGetUserIdRequest extends UserId, CalendarGetRequest {}

export class CalendarGetResponse {
  data: Array<Omit<ICalendarDay, 'userId'>>;
  totalTime?: number;
}
