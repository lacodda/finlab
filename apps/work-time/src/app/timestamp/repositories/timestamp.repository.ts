import { ITimestamp, ITimestampFindByQueryParams } from '@finlab/interfaces';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { TimestampEntity } from '../entities/timestamp.entity';
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

  async findById(id: string): Promise<ITimestamp> {
    try {
      return await this.timestampModel.findById(id).exec() as ITimestamp;
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
      return await this.timestampModel.find(params).exec();
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

  async delete(_id: string): Promise<void> {
    try {
      await this.timestampModel.deleteOne({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
