import { type ICalendarDay } from '@finlab/interfaces/work-time';
import { IsOptional, IsBoolean, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { type UserId } from '../../common/user-id';
import { FirstDayOfWeek } from '@finlab/interfaces';

const currentYear = new Date().getFullYear();
const MIN_YEAR = currentYear - 1;
const MAX_YEAR = currentYear + 10;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

export namespace CalendarGetByQuery {
  export const topic = 'work-time.calendar.get-by-query.query';

  export class Request {
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

  export class UserIdRequest {}
  export interface UserIdRequest extends UserId, Request {}

  export class Response {
    data: Array<Omit<ICalendarDay, 'userId'>>;
    totalTime?: number;
  }
}
