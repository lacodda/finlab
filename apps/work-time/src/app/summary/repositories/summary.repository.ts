import { Time } from '@finlab/helpers';
import { type ISummaryFindByQuery, type ISummary, type ISummaryFindByQueryParams } from '@finlab/interfaces/work-time';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type UpdateWriteOpResult } from 'mongoose';
import { type SummaryEntity } from '../entities/summary.entity';
import { Summary } from '../models/summary.model';

@Injectable()
export class SummaryRepository {
  constructor(
    @InjectModel(Summary.name) private readonly summaryModel: Model<Summary>
  ) {}

  async create(summary: SummaryEntity): Promise<ISummary> {
    try {
      // eslint-disable-next-line new-cap
      const newSummary = new this.summaryModel(summary);
      return await newSummary.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update({ _id, ...rest }: SummaryEntity): Promise<UpdateWriteOpResult> {
    try {
      return await this.summaryModel.updateOne({ _id }, { $set: { ...rest } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByQuery(params: ISummaryFindByQueryParams): Promise<ISummaryFindByQuery> {
    try {
      return (await this.summaryModel.aggregate<ISummaryFindByQuery>(
        [
          {
            $match: params
          },
          {
            $sort: {
              date: 1
            }
          },
          {
            $group: {
              _id: null,
              data: { $push: '$$ROOT' },
              totalTime: { $sum: '$time' }
            }
          }
        ]
      ))[0];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByDate(date: Date, userId: string): Promise<ISummary> {
    try {
      date = Time.dayRange(date).from;
      return await this.summaryModel.findOne({ date, userId }).exec() as ISummary;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.summaryModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
