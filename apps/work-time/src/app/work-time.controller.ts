import { WorkTimeCreate, WorkTimeDelete, WorkTimeGetById, WorkTimeGetByQuery, WorkTimeUpdate } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { WorkTimeService } from './work-time.service';

@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly workTimeService: WorkTimeService) {}

  @RMQValidate()
  @RMQRoute(WorkTimeCreate.topic)
  async create(@Body() dto: WorkTimeCreate.Request): Promise<WorkTimeCreate.Response> {
    return await this.workTimeService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeUpdate.topic)
  async update(@Body() dto: WorkTimeUpdate.Request): Promise<WorkTimeUpdate.Response> {
    return await this.workTimeService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeGetByQuery.topic)
  async getByQuery(@Body() dto: WorkTimeGetByQuery.Request): Promise<WorkTimeGetByQuery.Response> {
    return await this.workTimeService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeGetById.topic)
  async getById(@Body() dto: WorkTimeGetById.Request): Promise<WorkTimeGetById.Response> {
    return await this.workTimeService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeDelete.topic)
  async delete(@Body() dto: WorkTimeDelete.Request): Promise<WorkTimeDelete.Response> {
    return await this.workTimeService.delete(dto);
  }
}
