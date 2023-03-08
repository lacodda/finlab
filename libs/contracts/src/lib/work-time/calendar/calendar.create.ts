import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common/user-id';

export const CalendarCreateTopic = 'work-time.calendar.create.command';

export class CalendarCreateRequest {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
    date: Date;

  @ApiProperty()
  @IsEnum(CalendarType)
    type: CalendarType;
}

export class CalendarCreateUserIdRequest {}
export interface CalendarCreateUserIdRequest extends UserId, CalendarCreateRequest {}

export class CalendarCreateResponse {
  @ApiProperty()
    data: Omit<ICalendarDay, 'userId'>;
}
