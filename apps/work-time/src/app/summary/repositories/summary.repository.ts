import { type ISummary, type ISummaryFindByQueryParams } from '@finlab/interfaces/work-time';
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

  async findByQuery(params: ISummaryFindByQueryParams): Promise<ISummary[]> {
    try {
      return await this.summaryModel.find(params).sort({ date: 1 }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<ISummary> {
    try {
      return await this.summaryModel.findById(id).exec() as ISummary;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByDate(date: Date, userId: string): Promise<ISummary> {
    try {
      return await this.summaryModel.findOne({ date, userId }).exec() as ISummary;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.summaryModel.deleteOne({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
