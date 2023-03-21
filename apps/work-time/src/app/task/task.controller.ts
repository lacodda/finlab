
import {
  TaskGetTopic, TaskGetUserIdRequest, type TaskGetResponse, TaskCreateTopic, TaskCreateUserIdRequest, type TaskCreateResponse,
  TaskUpdateTopic, TaskUpdateUserIdRequest, type TaskUpdateResponse, TaskDeleteTopic, TaskDeleteUserIdRequest, type TaskDeleteResponse,
  TaskChangedTopic, TaskChangedUserIdRequest
} from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @RMQValidate()
  @RMQRoute(TaskGetTopic)
  async getByQuery(@Body() dto: TaskGetUserIdRequest): Promise<TaskGetResponse> {
    return await this.taskService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskCreateTopic)
  async create(@Body() dto: TaskCreateUserIdRequest): Promise<TaskCreateResponse> {
    return await this.taskService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskUpdateTopic)
  async update(@Body() dto: TaskUpdateUserIdRequest): Promise<TaskUpdateResponse> {
    return await this.taskService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskDeleteTopic)
  async delete(@Body() dto: TaskDeleteUserIdRequest): Promise<TaskDeleteResponse> {
    return await this.taskService.delete(dto);
  }

  @RMQValidate()
  @RMQRoute(TaskChangedTopic)
  async check(@Body() dto: TaskChangedUserIdRequest): Promise<boolean> {
    return this.taskService.check(dto);
  }
}
