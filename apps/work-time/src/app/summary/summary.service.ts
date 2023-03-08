import {
  type SummaryCreateResponse, type SummaryCreateUserIdRequest, type SummaryDeleteResponse, type SummaryDeleteUserIdRequest,
  type SummaryGetByQueryResponse, SummaryGetByQueryTopic, type SummaryGetByQueryUserIdRequest, type SummaryGetOneResponse,
  type SummaryGetOneUserIdRequest, type SummaryRecalculateResponse, type SummaryRecalculateUserIdRequest, type SummaryUpdateResponse,
  type SummaryUpdateUserIdRequest, type TimestampGetByQueryResponse, type TimestampGetByQueryUserIdRequest
} from '@finlab/contracts/work-time';
import { Time } from '@finlab/helpers';
import { type ISummaryFindByQueryParams, type ISummary } from '@finlab/interfaces/work-time';
import { Injectable } from '@nestjs/common';
import { type UpdateWriteOpResult } from 'mongoose';
import { RMQService } from 'nestjs-rmq';
import { SummaryEntity } from './entities/summary.entity';
import { SummaryRepository } from './repositories/summary.repository';

@Injectable()
export class SummaryService {
  constructor(
    private readonly summaryRepository: SummaryRepository,
    private readonly rmqService: RMQService) { }

  async create(dto: SummaryCreateUserIdRequest): Promise<SummaryCreateResponse> {
    const date = Time.dayRange(dto.date).from;
    const existedSummary = await this.summaryRepository.findByDate(date, dto.userId);
    if (existedSummary) {
      const data = await this.updateTime(existedSummary, dto.time);
      return { data };
    }
    const newSummaryEntity = new SummaryEntity({ ...dto, date });
    const newSummary = await this.summaryRepository.create(newSummaryEntity);

    return { data: new SummaryEntity(newSummary).entity };
  }

  async update(dto: SummaryUpdateUserIdRequest): Promise<SummaryUpdateResponse> {
    const existedSummary = await this.summaryRepository.findByDate(dto.date, dto.userId);
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

  async getByQuery(dto: SummaryGetByQueryUserIdRequest): Promise<SummaryGetByQueryResponse> {
    const params: ISummaryFindByQueryParams = {
      userId: dto.userId
    };
    if (dto.from && dto.to) {
      params.date = {
        $gte: new Date(dto.from),
        $lte: new Date(dto.to)
      };
    }
    const { data, totalTime } = await this.summaryRepository.findByQuery(params);

    return {
      data: data.map(summary => new SummaryEntity(summary).entity),
      totalTime
    };
  }

  async getOne(dto: SummaryGetOneUserIdRequest): Promise<SummaryGetOneResponse> {
    const existedSummary = await this.summaryRepository.findByDate(dto.date, dto.userId);
    if (!existedSummary) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new SummaryEntity(existedSummary).entity };
  }

  async recalculate({ userId, from, to }: SummaryRecalculateUserIdRequest): Promise<SummaryRecalculateResponse> {
    const dates = Time.datesInRange(from, to);
    for (const dateObj of dates) {
      const date = dateObj;
      const { totalTime: time } = await this.rmqService.send<TimestampGetByQueryUserIdRequest, TimestampGetByQueryResponse>(
        SummaryGetByQueryTopic, { userId, date }
      );
      if (time) {
        await this.create({ userId, date, time });
      } else {
        await this.delete({ userId, date });
      }
    }

    return await this.getByQuery({ userId, from, to });
  }

  async delete(dto: SummaryDeleteUserIdRequest): Promise<SummaryDeleteResponse> {
    const dayRange = Time.dayRange(dto.date);
    const existedSummary = await this.summaryRepository.findByDate(dayRange.from, dto.userId);
    if (existedSummary) {
      await this.summaryRepository.delete(existedSummary._id as string);
    }

    return { data: existedSummary };
  }

  private async updateSummary(summary: SummaryEntity): Promise<[UpdateWriteOpResult]> {
    return await Promise.all(
      [
        this.summaryRepository.update(summary)
      ]
    );
  }
}
