import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type UserId } from '../../common/user-id';

export namespace CalendarCreate {
  export const topic = 'work-time.calendar.create.command';

  export class Request {
    @ApiProperty()
    @IsDateString()
      date: string;

    @ApiProperty()
    @IsString()
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
