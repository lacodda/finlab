import { CalendarCreate, CalendarDelete, CalendarGetByDate, CalendarGetByQuery, CalendarUpdate } from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) { }

  @RMQValidate()
  @RMQRoute(CalendarCreate.topic)
  async create(@Body() dto: CalendarCreate.UserIdRequest): Promise<CalendarCreate.Response> {
    return await this.calendarService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarUpdate.topic)
  async update(@Body() dto: CalendarUpdate.UserIdRequest): Promise<CalendarUpdate.Response> {
    return await this.calendarService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarGetByQuery.topic)
  async getByQuery(@Body() dto: CalendarGetByQuery.UserIdRequest): Promise<CalendarGetByQuery.Response> {
    return await this.calendarService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarGetByDate.topic)
  async getByDate(@Body() dto: CalendarGetByDate.UserIdRequest): Promise<CalendarGetByDate.Response> {
    return await this.calendarService.getByDate(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarDelete.topic)
  async delete(@Body() dto: CalendarDelete.UserIdRequest): Promise<CalendarDelete.Response> {
    return await this.calendarService.delete(dto);
  }
}
