import { TimestampCreate, TimestampDelete, TimestampGetById, TimestampGetByQuery, TimestampUpdate } from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TimestampService } from './timestamp.service';

@Controller('timestamp')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) { }

  @RMQValidate()
  @RMQRoute(TimestampCreate.topic)
  async create(@Body() dto: TimestampCreate.Request): Promise<TimestampCreate.Response> {
    return await this.timestampService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampUpdate.topic)
  async update(@Body() dto: TimestampUpdate.Request): Promise<TimestampUpdate.Response> {
    return await this.timestampService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampGetByQuery.topic)
  async getByQuery(@Body() dto: TimestampGetByQuery.Request): Promise<TimestampGetByQuery.Response> {
    return await this.timestampService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampGetById.topic)
  async getById(@Body() dto: TimestampGetById.Request): Promise<TimestampGetById.Response> {
    return await this.timestampService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampDelete.topic)
  async delete(@Body() dto: TimestampDelete.Request): Promise<TimestampDelete.Response> {
    return await this.timestampService.delete(dto);
  }
}
