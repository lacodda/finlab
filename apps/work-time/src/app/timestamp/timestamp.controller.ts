import { WorkTimeTimestampCreate, WorkTimeTimestampDelete, WorkTimeTimestampGetById, WorkTimeTimestampGetByQuery, WorkTimeTimestampUpdate } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TimestampService } from './timestamp.service';

@Controller('timestamp')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) { }

  @RMQValidate()
  @RMQRoute(WorkTimeTimestampCreate.topic)
  async create(@Body() dto: WorkTimeTimestampCreate.Request): Promise<WorkTimeTimestampCreate.Response> {
    return await this.timestampService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTimestampUpdate.topic)
  async update(@Body() dto: WorkTimeTimestampUpdate.Request): Promise<WorkTimeTimestampUpdate.Response> {
    return await this.timestampService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTimestampGetByQuery.topic)
  async getByQuery(@Body() dto: WorkTimeTimestampGetByQuery.Request): Promise<WorkTimeTimestampGetByQuery.Response> {
    return await this.timestampService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTimestampGetById.topic)
  async getById(@Body() dto: WorkTimeTimestampGetById.Request): Promise<WorkTimeTimestampGetById.Response> {
    return await this.timestampService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTimestampDelete.topic)
  async delete(@Body() dto: WorkTimeTimestampDelete.Request): Promise<WorkTimeTimestampDelete.Response> {
    return await this.timestampService.delete(dto);
  }
}
