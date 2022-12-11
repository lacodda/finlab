import { IWorkTime, IWorkTimeFindByQueryParams } from '@finlab/interfaces';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { WorkTimeEntity } from '../entities/work-time.entity';
import { WorkTime } from '../models/work-time.model';

@Injectable()
export class WorkTimeRepository {
  constructor(
    @InjectModel(WorkTime.name) private readonly workTimeModel: Model<WorkTime>
  ) {}

  async create(workTime: WorkTimeEntity): Promise<IWorkTime> {
    try {
      // eslint-disable-next-line new-cap
      const newWorkTime = new this.workTimeModel(workTime);
      return await newWorkTime.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ _id, ...rest }: WorkTimeEntity): Promise<UpdateWriteOpResult> {
    try {
      return await this.workTimeModel.updateOne({ _id }, { $set: { ...rest } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByQuery(params: IWorkTimeFindByQueryParams): Promise<IWorkTime[]> {
    try {
      return await this.workTimeModel.find(params).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<IWorkTime> {
    try {
      return await this.workTimeModel.findById(id).exec() as IWorkTime;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByDate(date: Date): Promise<IWorkTime> {
    try {
      return await this.workTimeModel.findOne({ date }).exec() as IWorkTime;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.workTimeModel.deleteOne({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
