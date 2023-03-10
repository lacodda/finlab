import { Type } from 'class-transformer';
import { IsEnum, IsDate } from 'class-validator';
import { CalendarType } from '@finlab/interfaces/work-time';
import { type UserId } from '../../common';
import { ApiProperty } from '@nestjs/swagger';
import { Calendar } from './calendar.model';

export const CalendarUpdateTopic = 'work-time.calendar.update.command';

export class CalendarUpdateRequestParam {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
    date: Date;
}

export class CalendarUpdateRequestBody {
  @ApiProperty({ enum: CalendarType, enumName: 'CalendarType' })
  @IsEnum(CalendarType)
    type: CalendarType;
}

export class CalendarUpdateUserIdRequest { }
export interface CalendarUpdateUserIdRequest extends UserId, CalendarUpdateRequestParam, CalendarUpdateRequestBody { }

export class CalendarUpdateResponse {
  @ApiProperty({ type: Calendar })
    data: Calendar;
}
