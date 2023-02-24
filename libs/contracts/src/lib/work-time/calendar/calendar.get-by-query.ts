import { type ICalendarDay } from '@finlab/interfaces/work-time';
import { IsString, IsOptional, IsNumberString, IsBooleanString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

const currentYear = new Date().getFullYear();
const MIN_YEAR = currentYear - 1;
const MAX_YEAR = currentYear + 10;
const MIN_MONTH = 1;
const MAX_MONTH = 12;

export namespace CalendarGetByQuery {
  export const topic = 'work-time.calendar.get-by-query.query';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsNumberString()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_YEAR)
    @Max(MAX_YEAR)
      year?: number;

    @IsOptional()
    @IsNumberString()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_MONTH)
    @Max(MAX_MONTH)
      month?: number;

    @IsOptional()
    @IsBooleanString()
    @Type(() => Boolean)
      fillUp?: boolean;
  }

  export class Response {
    data: Array<Omit<ICalendarDay, 'userId'>>;
  }
}
