import { WorkTimeTaskCreate, WorkTimeTaskDelete, WorkTimeTaskGetById, WorkTimeTaskGetByQuery, WorkTimeTaskUpdate } from '@finlab/contracts';
import { Time } from '@finlab/helpers';
import { ITask, ITaskFindIncompleteParams, ITaskFindByQueryParams, ITaskUpdate } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TasksEntity } from './entities/tasks.entity';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) { }

  async create(dto: WorkTimeTaskCreate.Request): Promise<WorkTimeTaskCreate.Response> {
    const dayRange = Time.dayRange(dto.date);
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
    const params: ITaskFindIncompleteParams = {
      userId: dto.userId,
      date: {
        $gte: new Date(dto.from),
        $lte: new Date(dto.to)
      },
      incomplete: (dto.incomplete as unknown as string) === 'true',
      includeAll: (dto.includeAll as unknown as string) === 'true'
    };

    const tasks = params.incomplete
      ? await this.taskRepository.findAndGroupByQuery(params)
      : await this.taskRepository.findByQuery(params);

    return { data: new TasksEntity(tasks).entities };
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
