import {
  type TaskCreateRequest, type TaskCreateResponse, type TaskUpdateRequest, type TaskUpdateResponse, type TaskGetByQueryRequest, type TaskGetByQueryResponse,
  type TaskGetOneRequest, type TaskGetOneResponse, type TaskDeleteRequest, type TaskDeleteResponse
} from '@finlab/contracts/work-time';
import { Time } from '@finlab/helpers';
import { type ITask, type ITaskFindIncompleteParams, type ITaskFindByQueryParams, type ITaskUpdate, type ITaskFindForDay } from '@finlab/interfaces/work-time';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TasksEntity } from './entities/tasks.entity';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) { }

  async create(dto: TaskCreateRequest): Promise<TaskCreateResponse> {
    const existedTask = await this.getForDay(dto) as ITask;
    if (existedTask) {
      const data = await this.updateTask(existedTask, dto);
      return { data };
    }
    const date = Time.dayRange(dto.date).from;
    const newTaskEntity = new TaskEntity({ ...dto, date });
    const newTask = await this.taskRepository.create(newTaskEntity);

    return { data: new TaskEntity(newTask).entity };
  }

  async update(dto: TaskUpdateRequest): Promise<TaskUpdateResponse> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateTask(existedTask, dto);

    return { data };
  }

  async getByQuery(dto: TaskGetByQueryRequest): Promise<TaskGetByQueryResponse> {
    const params: ITaskFindIncompleteParams = {
      userId: dto.userId,
      date: {
        $gte: new Date(dto.from),
        $lte: new Date(dto.to)
      },
      incomplete: (dto.incomplete as unknown as string) === 'true',
      includeAll: (dto.includeAll as unknown as string) === 'true'
    };

    if (params.incomplete) {
      params.excludeTaskIds = (await this.getForDay({ userId: dto.userId, date: new Date() }) as ITask[]).map(({ taskId }) => taskId);
    }

    const tasks = params.incomplete
      ? await this.taskRepository.findAndGroupByQuery(params)
      : await this.taskRepository.findByQuery(params);

    return { data: new TasksEntity(tasks).entities };
  }

  async getOne(dto: TaskGetOneRequest): Promise<TaskGetOneResponse> {
    const existedTask = await this.taskRepository.findById(dto.id);
    if (!existedTask) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new TaskEntity(existedTask).entity };
  }

  async getForDay(dto: ITaskFindForDay): Promise<ITask | ITask[]> {
    const dayRange = Time.dayRange(dto.date);
    const params: ITaskFindByQueryParams = {
      userId: dto.userId,
      date: {
        $gte: dayRange.from,
        $lte: dayRange.to
      }
    };
    return dto.name
      ? await this.taskRepository.findOneByQuery({ ...params, name: dto.name })
      : await this.taskRepository.findByQuery(params);
  }

  async delete(dto: TaskDeleteRequest): Promise<TaskDeleteResponse> {
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
