import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace CalendarCreate {
  export const topic = 'work-time.calendar.create.command';

  export class Request {
    @ApiProperty()
    @IsString()
      userId: string;

    @ApiProperty()
    @IsDateString()
      date: string;

    @ApiProperty()
    @IsString()
    @IsEnum(CalendarType)
      type: CalendarType;
  }

  export class Response {
    @ApiProperty()
      data: Omit<ICalendarDay, 'userId'>;
  }
}
