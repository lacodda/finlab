import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common/user-id';

export const CalendarUpdateTopic = 'work-time.calendar.update.command';

export class CalendarUpdateRequestParam {
  @IsDate()
  @Type(() => Date)
    date: Date;
}

export class CalendarUpdateRequestBody {
  @IsEnum(CalendarType)
    type: CalendarType;
}

export class CalendarUpdateUserIdRequest { }
export interface CalendarUpdateUserIdRequest extends UserId, CalendarUpdateRequestParam, CalendarUpdateRequestBody { }

export class CalendarUpdateResponse {
  data: Omit<ICalendarDay, 'userId'>;
}
