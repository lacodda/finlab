import { WorkTimeTaskCreate, WorkTimeTaskDelete, WorkTimeTaskGetById, WorkTimeTaskGetByQuery, WorkTimeTaskUpdate } from '@finlab/contracts';
import { Time } from '@finlab/helpers';
import { ITask, ITaskFindByQueryParams, ITaskUpdate } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) { }

  async create(dto: WorkTimeTaskCreate.Request): Promise<WorkTimeTaskCreate.Response> {
    const dayRange = Time.dayRangeISO(dto.date);
    const params: ITaskFindByQueryParams = {
      userId: dto.userId,
      date: {
        $gte: dayRange.from,
        $lte: dayRange.to
      },
      name: dto.name
    };
    const existedTask = await this.taskRepository.findOneByQuery(params);
    if (existedTask) {
      const data = await this.updateTask(existedTask, dto);
      return { data };
    }
    const date = Time.dayRange(dto.date).from;
    const newTaskEntity = await new TaskEntity({ ...dto, date });
    const newTask = await this.taskRepository.create(newTaskEntity);

    return { data: new TaskEntity(newTask).entity };
  }

  async update(dto: WorkTimeTaskUpdate.Request): Promise<WorkTimeTaskUpdate.Response> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateTask(existedTask, dto);

    return { data };
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
    if (dto.completeness !== undefined) {
      params.completeness = dto.completeness;
    }
    if (dto.excludedFromSearch !== undefined) {
      params.excludedFromSearch = dto.excludedFromSearch;
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

  private async updateTask(task: ITask, { name, comment, completeness, excludedFromSearch }: ITaskUpdate): Promise<Omit<ITask, 'userId'>> {
    const taskEntity = new TaskEntity(task)
      .updateName(name)
      .updateComment(comment)
      .updateCompleteness(completeness)
      .updateExcludedFromSearch(excludedFromSearch);
    await Promise.all(
      [
        this.taskRepository.update(taskEntity)
      ]
    );

    return taskEntity.entity;
  }
}
