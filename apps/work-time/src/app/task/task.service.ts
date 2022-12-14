import { WorkTimeTaskCreate, WorkTimeTaskDelete, WorkTimeTaskGetById, WorkTimeTaskGetByQuery, WorkTimeTaskUpdate } from '@finlab/contracts';
import { ITaskFindByQueryParams } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { TaskEntity } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) { }

  async create(dto: WorkTimeTaskCreate.Request): Promise<WorkTimeTaskCreate.Response> {
    const date = new Date(new Date(dto.date).setUTCHours(0, 0, 0, 0));
    const params: ITaskFindByQueryParams = {
      userId: dto.userId,
      date: {
        $gte: date.toISOString(),
        $lte: new Date(new Date(date).setUTCHours(23, 59, 59, 999)).toISOString()
      },
      text: dto.text
    };

    const existedTask = await this.taskRepository.findOneByQuery(params);
    if (existedTask) {
      throw new Error('This task is already created');
    }
    const newTaskEntity = await new TaskEntity({ ...dto, date });
    const newTask = await this.taskRepository.create(newTaskEntity);

    return { data: new TaskEntity(newTask).entity };
  }

  async update(dto: WorkTimeTaskUpdate.Request): Promise<WorkTimeTaskUpdate.Response> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to update non-existing entry');
    }
    const taskEntity = new TaskEntity(existedTask).updateText(dto.text).updateCompleteness(dto.completeness);
    await this.updateTask(taskEntity);

    return { data: taskEntity.entity };
  }

  async getByQuery(dto: WorkTimeTaskGetByQuery.Request): Promise<WorkTimeTaskGetByQuery.Response> {
    const params: ITaskFindByQueryParams = {
      userId: dto.userId
    };
    if (dto.from && dto.to) {
      params.date = {
        $gte: new Date(dto.from).toISOString(),
        $lte: new Date(dto.to).toISOString()
      };
    }
    const taskArray = await this.taskRepository.findByQuery(params);

    return { data: taskArray.map(task => new TaskEntity(task).entity) };
  }

  async getById(dto: WorkTimeTaskGetById.Request): Promise<WorkTimeTaskGetById.Response> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new TaskEntity(existedTask).entity };
  }

  async delete(dto: WorkTimeTaskDelete.Request): Promise<WorkTimeTaskDelete.Response> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.taskRepository.delete(dto.id);

    return { data: { _id: existedTask._id } };
  }

  private async updateTask(task: TaskEntity): Promise<[UpdateWriteOpResult]> {
    return await Promise.all(
      [
        this.taskRepository.update(task)
      ]
    );
  }
}
