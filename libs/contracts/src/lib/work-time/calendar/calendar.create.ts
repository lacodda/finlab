import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type UserId } from '../../common/user-id';
import { Type } from 'class-transformer';

export namespace CalendarCreate {
  export const topic = 'work-time.calendar.create.command';

  export class Request {
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
      date: Date;

    @ApiProperty()
    @IsEnum(CalendarType)
      type: CalendarType;
  }

  export class UserIdRequest {}
  export interface UserIdRequest extends UserId, Request {}

  export class Response {
    @ApiProperty()
      data: Omit<ICalendarDay, 'userId'>;
  }
}
