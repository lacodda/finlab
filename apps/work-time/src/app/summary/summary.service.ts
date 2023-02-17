import { type TimestampChanged, type SummaryCreate, type SummaryDelete, type SummaryGetById, type SummaryGetByQuery, type SummaryUpdate } from '@finlab/contracts/work-time';
import { Time } from '@finlab/helpers';
import { type ITimestampFindByQueryParams, type ISummaryFindByQueryParams, ISummary } from '@finlab/interfaces/work-time';
import { Injectable } from '@nestjs/common';
import { type UpdateWriteOpResult } from 'mongoose';
import { TimestampsEntity } from '../timestamp/entities/timestamps.entity';
import { TimestampRepository } from '../timestamp/repositories/timestamp.repository';
import { SummaryEntity } from './entities/summary.entity';
import { SummaryRepository } from './repositories/summary.repository';

const MIN_BREAK_TIME = 20; // FIXME move to settings

@Injectable()
export class SummaryService {
  constructor(
    private readonly summaryRepository: SummaryRepository,
    private readonly timestampRepository: TimestampRepository
  ) { }

  async create(dto: SummaryCreate.Request): Promise<SummaryCreate.Response> {
    const dayRange = Time.dayRange(dto.date);
    const existedSummary = await this.summaryRepository.findByDate(dayRange.from, dto.userId);
    if (existedSummary) {
      const data = await this.updateTime(existedSummary, dto.time);
      return { data };
    }
    const newSummaryEntity = new SummaryEntity({ ...dto, date: dayRange.from });
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

  async updateTime(summary: ISummary, time: number): Promise<Omit<ISummary, 'userId'>> {
    const summaryEntity = new SummaryEntity(summary).updateTime(time);
    await this.summaryRepository.update(summaryEntity);
    return summaryEntity.entity;
  }

  async calculate(dto: TimestampChanged.Request): Promise<void> {
    const dayRange = Time.dayRangeISO(dto.timestamp);
    const params: ITimestampFindByQueryParams = {
      userId: dto.userId,
      timestamp: {
        $gte: dayRange.from,
        $lte: dayRange.to
      }
    };
    const timestampArray = await this.timestampRepository.findByQuery(params);
    const { totalTime } = new TimestampsEntity(timestampArray, MIN_BREAK_TIME).process().result();
    void this.create({ userId: dto.userId, date: dayRange.from, time: totalTime });
    // const summaryEntity = new SummaryEntity({ userId: dto.userId, date: dayRange.from, time });
    // await this.summaryRepository.create(summaryEntity);
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
