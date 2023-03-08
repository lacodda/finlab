import {
  TaskCreateRequest, type TaskCreateResponse, TaskCreateTopic, TaskDeleteRequest, type TaskDeleteResponse, TaskDeleteTopic,
  TaskGetByQueryRequest, type TaskGetByQueryResponse, TaskGetByQueryTopic, TaskGetOneRequest, type TaskGetOneResponse, TaskGetOneTopic,
  TaskUpdateRequest, type TaskUpdateResponse, TaskUpdateTopic
} from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @RMQValidate()
  @RMQRoute(TaskCreateTopic)
  async create(@Body() dto: TaskCreateRequest): Promise<TaskCreateResponse> {
    return await this.taskService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskUpdateTopic)
  async update(@Body() dto: TaskUpdateRequest): Promise<TaskUpdateResponse> {
    return await this.taskService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskGetByQueryTopic)
  async getByQuery(@Body() dto: TaskGetByQueryRequest): Promise<TaskGetByQueryResponse> {
    return await this.taskService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskGetOneTopic)
  async getOne(@Body() dto: TaskGetOneRequest): Promise<TaskGetOneResponse> {
    return await this.taskService.getOne(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskDeleteTopic)
  async delete(@Body() dto: TaskDeleteRequest): Promise<TaskDeleteResponse> {
    return await this.taskService.delete(dto);
  }
}
