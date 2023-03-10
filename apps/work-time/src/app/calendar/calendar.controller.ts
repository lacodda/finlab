import {
  type CalendarCreateResponse, CalendarCreateTopic, CalendarCreateUserIdRequest, type CalendarDeleteResponse, CalendarDeleteTopic,
  CalendarDeleteUserIdRequest, type CalendarGetResponse, CalendarGetTopic, CalendarGetUserIdRequest, type CalendarUpdateResponse,
  CalendarUpdateTopic, CalendarUpdateUserIdRequest
} from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) { }

  @RMQValidate()
  @RMQRoute(CalendarGetTopic)
  async getByQuery(@Body() dto: CalendarGetUserIdRequest): Promise<CalendarGetResponse> {
    return await this.calendarService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarCreateTopic)
  async create(@Body() dto: CalendarCreateUserIdRequest): Promise<CalendarCreateResponse> {
    return await this.calendarService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarUpdateTopic)
  async update(@Body() dto: CalendarUpdateUserIdRequest): Promise<CalendarUpdateResponse> {
    return await this.calendarService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarDeleteTopic)
  async delete(@Body() dto: CalendarDeleteUserIdRequest): Promise<CalendarDeleteResponse> {
    return await this.calendarService.delete(dto);
  }
}
