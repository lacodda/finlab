import { CalendarCreate, CalendarDelete, CalendarGetById, CalendarGetByQuery, CalendarUpdate } from '@finlab/contracts/work-time';
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
  async update(@Body() dto: CalendarUpdate.IdRequest): Promise<CalendarUpdate.Response> {
    return await this.calendarService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarGetByQuery.topic)
  async getByQuery(@Body() dto: CalendarGetByQuery.UserIdRequest): Promise<CalendarGetByQuery.Response> {
    return await this.calendarService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarGetById.topic)
  async getById(@Body() dto: CalendarGetById.Request): Promise<CalendarGetById.Response> {
    return await this.calendarService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(CalendarDelete.topic)
  async delete(@Body() dto: CalendarDelete.Request): Promise<CalendarDelete.Response> {
    return await this.calendarService.delete(dto);
  }
}
