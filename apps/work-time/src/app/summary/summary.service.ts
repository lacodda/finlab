import { type SummaryCreate, type SummaryDelete, type SummaryGetById, type SummaryGetByQuery, type SummaryUpdate } from '@finlab/contracts/work-time';
import { type ISummaryFindByQueryParams } from '@finlab/interfaces/work-time';
import { Injectable } from '@nestjs/common';
import { type UpdateWriteOpResult } from 'mongoose';
import { SummaryEntity } from './entities/summary.entity';
import { SummaryRepository } from './repositories/summary.repository';

@Injectable()
export class SummaryService {
  constructor(private readonly summaryRepository: SummaryRepository) { }

  async create(dto: SummaryCreate.Request): Promise<SummaryCreate.Response> {
    const date = new Date(new Date(dto.date).setUTCHours(0, 0, 0, 0));
    const existedSummary = await this.summaryRepository.findByDate(date, dto.userId);
    if (existedSummary) {
      throw new Error('This date is already created');
    }
    const newSummaryEntity = new SummaryEntity({ ...dto, date });
    const newSummary = await this.summaryRepository.create(newSummaryEntity);

    return { data: new SummaryEntity(newSummary).entity };
  }

  async update(dto: SummaryUpdate.Request): Promise<SummaryUpdate.Response> {
    const existedSummary = await this.summaryRepository.findById(dto.id);
    if (!existedSummary) {
      throw new Error('Unable to update non-existing entry');
    }
    const summaryEntity = new SummaryEntity(existedSummary).updateTime(dto.time);
    await this.updateSummary(summaryEntity);

    return { data: summaryEntity.entity };
  }

  async getByQuery(dto: SummaryGetByQuery.Request): Promise<SummaryGetByQuery.Response> {
    const params: ISummaryFindByQueryParams = {
      userId: dto.userId
    };
    if (dto.from && dto.to) {
      params.date = {
        $gte: new Date(dto.from).toISOString(),
        $lte: new Date(dto.to).toISOString()
      };
    }
    const summaryArray = await this.summaryRepository.findByQuery(params);

    return { data: summaryArray.map(summary => new SummaryEntity(summary).entity) };
  }

  async getById(dto: SummaryGetById.Request): Promise<SummaryGetById.Response> {
    const existedSummary = await this.summaryRepository.findById(dto.id);
    if (!existedSummary) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new SummaryEntity(existedSummary).entity };
  }

  async delete(dto: SummaryDelete.Request): Promise<SummaryDelete.Response> {
    const existedSummary = await this.summaryRepository.findById(dto.id);
    if (!existedSummary) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.summaryRepository.delete(dto.id);

    return { data: { _id: existedSummary._id } };
  }

  private async updateSummary(summary: SummaryEntity): Promise<[UpdateWriteOpResult]> {
    return await Promise.all(
      [
        this.summaryRepository.update(summary)
      ]
    );
  }
}
