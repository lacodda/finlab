import { type ITimestamp, type ITimestampFindByQueryParams } from '@finlab/interfaces/work-time';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type UpdateWriteOpResult } from 'mongoose';
import { type TimestampEntity } from '../entities/timestamp.entity';
import { Timestamp } from '../models/timestamp.model';

@Injectable()
export class TimestampRepository {
  constructor(
    @InjectModel(Timestamp.name) private readonly timestampModel: Model<Timestamp>
  ) { }

  async create(timestamp: TimestampEntity): Promise<ITimestamp> {
    try {
      // eslint-disable-next-line new-cap
      const newTimestamp = new this.timestampModel(timestamp);
      return await newTimestamp.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ _id, ...rest }: TimestampEntity): Promise<UpdateWriteOpResult> {
    try {
      return await this.timestampModel.updateOne({ _id }, { $set: { ...rest } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByQuery(params: ITimestampFindByQueryParams): Promise<ITimestamp> {
    try {
      return await this.timestampModel.findOne(params).exec() as ITimestamp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByQuery(params: ITimestampFindByQueryParams): Promise<ITimestamp[]> {
    try {
      return await this.timestampModel.find(params).sort({ timestamp: 1 }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByDate(timestamp: Date, userId: string): Promise<ITimestamp> {
    try {
      return await this.timestampModel.findOne({ timestamp, userId }).exec() as ITimestamp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.timestampModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
