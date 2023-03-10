import {
  type TaskGetUserIdRequest, type TaskGetResponse, type TaskCreateUserIdRequest, type TaskCreateResponse,
  type TaskUpdateUserIdRequest, type TaskUpdateResponse, type TaskDeleteUserIdRequest, type TaskDeleteResponse, type Task
} from '@finlab/contracts/work-time';
import { Time } from '@finlab/helpers';
import { type ITask, type ITaskFindIncompleteParams, type ITaskUpdate, type ITaskFindIncompleteResult } from '@finlab/interfaces/work-time';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TasksEntity } from './entities/tasks.entity';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) { }

  async getByQuery(dto: TaskGetUserIdRequest): Promise<TaskGetResponse> {
    const { from, to } = Time.dayRange();
    const params: ITaskFindIncompleteParams = {
      userId: dto.userId,
      date: {
        $gte: dto.from ? Time.dayRange(dto.from).from : from,
        $lte: dto.to ? Time.dayRange(dto.to).to : to
      },
      incomplete: dto.incomplete ?? false,
      includeAll: dto.includeAll ?? false
    };
    let tasks: Array<ITask | ITaskFindIncompleteResult>;
    if (params.incomplete) {
      params.excludeTaskIds = (await this.taskRepository.findByDate(dto.userId, Time.dayRange().from))
        .map(({ taskId }) => taskId as string);
      tasks = await this.taskRepository.findAndGroupByQuery(params);
    } else {
      tasks = await this.taskRepository.findByQuery(params);
    }

    return { data: new TasksEntity(tasks).entities };
  }

  async create(dto: TaskCreateUserIdRequest): Promise<TaskCreateResponse> {
    const date = Time.dayRange(dto.date).from;
    const existedTask = await this.taskRepository.findOne(dto.userId, date, dto.name);
    if (existedTask) {
      const data = await this.updateTask(existedTask, dto);
      return { data };
    }
    const newTaskEntity = new TaskEntity({ ...dto, date });
    const newTask = await this.taskRepository.create(newTaskEntity);

    return { data: new TaskEntity(newTask).entity };
  }

  async update(dto: TaskUpdateUserIdRequest): Promise<TaskUpdateResponse> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateTask(existedTask, dto);

    return { data };
  }

  async delete(dto: TaskDeleteUserIdRequest): Promise<TaskDeleteResponse> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.taskRepository.delete(dto.id);

    return { data: new TaskEntity(existedTask).entity };
  }

  private async updateTask(task: ITask, { name, comment, completeness, excludedFromSearch }: ITaskUpdate): Promise<Task> {
    const taskEntity = new TaskEntity(task)
      .updateName(name)
      .updateComment(comment)
      .updateCompleteness(completeness)
      .updateExcludedFromSearch(excludedFromSearch);
    await this.taskRepository.update(taskEntity);

    return taskEntity.entity;
  }
}
