import { TaskCreate, TaskDelete, TaskGetById, TaskGetByQuery, TaskUpdate } from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @RMQValidate()
  @RMQRoute(TaskCreate.topic)
  async create(@Body() dto: TaskCreate.Request): Promise<TaskCreate.Response> {
    return await this.taskService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskUpdate.topic)
  async update(@Body() dto: TaskUpdate.Request): Promise<TaskUpdate.Response> {
    return await this.taskService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskGetByQuery.topic)
  async getByQuery(@Body() dto: TaskGetByQuery.Request): Promise<TaskGetByQuery.Response> {
    return await this.taskService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskGetById.topic)
  async getById(@Body() dto: TaskGetById.Request): Promise<TaskGetById.Response> {
    return await this.taskService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskDelete.topic)
  async delete(@Body() dto: TaskDelete.Request): Promise<TaskDelete.Response> {
    return await this.taskService.delete(dto);
  }
}
