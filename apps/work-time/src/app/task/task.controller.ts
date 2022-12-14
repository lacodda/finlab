import { WorkTimeTaskCreate, WorkTimeTaskDelete, WorkTimeTaskGetById, WorkTimeTaskGetByQuery, WorkTimeTaskUpdate } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @RMQValidate()
  @RMQRoute(WorkTimeTaskCreate.topic)
  async create(@Body() dto: WorkTimeTaskCreate.Request): Promise<WorkTimeTaskCreate.Response> {
    return await this.taskService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTaskUpdate.topic)
  async update(@Body() dto: WorkTimeTaskUpdate.Request): Promise<WorkTimeTaskUpdate.Response> {
    return await this.taskService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTaskGetByQuery.topic)
  async getByQuery(@Body() dto: WorkTimeTaskGetByQuery.Request): Promise<WorkTimeTaskGetByQuery.Response> {
    return await this.taskService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTaskGetById.topic)
  async getById(@Body() dto: WorkTimeTaskGetById.Request): Promise<WorkTimeTaskGetById.Response> {
    return await this.taskService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(WorkTimeTaskDelete.topic)
  async delete(@Body() dto: WorkTimeTaskDelete.Request): Promise<WorkTimeTaskDelete.Response> {
    return await this.taskService.delete(dto);
  }
}
