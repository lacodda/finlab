import { type ITask, type ITaskFindIncompleteParams, type ITaskFindIncompleteResult, type ITaskFindByQueryParams } from '@finlab/interfaces/work-time';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type UpdateWriteOpResult } from 'mongoose';
import { type TaskEntity } from '../entities/task.entity';
import { Task } from '../models/task.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>
  ) { }

  async create(task: TaskEntity): Promise<ITask> {
    try {
      // eslint-disable-next-line new-cap
      const newTask = new this.taskModel(task);
      return await newTask.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ _id, ...rest }: TaskEntity): Promise<UpdateWriteOpResult> {
    try {
      return await this.taskModel.updateOne({ _id }, { $set: { ...rest } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<ITask> {
    try {
      return await this.taskModel.findById(id).exec() as ITask;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(userId: string, date: Date, name: string): Promise<ITask> {
    try {
      return await this.taskModel.findOne({ userId, date, name }).exec() as ITask;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByDate(userId: string, date: Date): Promise<ITask[]> {
    try {
      return await this.taskModel.find({ userId, date }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByQuery(params: ITaskFindByQueryParams): Promise<ITask[]> {
    try {
      return await this.taskModel.find(params).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAndGroupByQuery(params: ITaskFindIncompleteParams): Promise<ITaskFindIncompleteResult[]> {
    try {
      const resultMatch: Partial<{ completeness: Record<string, unknown>, excludedFromSearch: Record<string, unknown> }> = {
        completeness: { $lt: 100 },
        excludedFromSearch: {
          $not: { $gt: 0 }
        }
      };
      if (params.includeAll) {
        delete resultMatch.excludedFromSearch;
      }
      return await this.taskModel.aggregate(
        [
          {
            $match: {
              date: params.date,
              taskId: { $not: { $in: params.excludeTaskIds } }
            }
          },
          {
            $group: {
              _id: '$taskId',
              tasks: { $push: '$$ROOT' },
              completeness: { $max: '$completeness' },
              excludedFromSearch: { $sum: { $cond: [{ $eq: ['$excludedFromSearch', true] }, 1, 0] } }
            }
          },
          { $match: resultMatch }
        ]
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.taskModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
