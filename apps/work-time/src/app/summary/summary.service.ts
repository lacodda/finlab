import { type SummaryGetResponse, type SummaryGetUserIdRequest, type TimestampGetResponse, type TimestampGetUserIdRequest, TimestampGetTopic, type SummaryUserId } from '@finlab/contracts/work-time';
import { Time } from '@finlab/helpers';
import { type ISummaryFindByQueryParams } from '@finlab/interfaces/work-time';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { SummaryEntity } from './entities/summary.entity';
import { SummaryRepository } from './repositories/summary.repository';

@Injectable()
export class SummaryService {
  constructor(
    private readonly summaryRepository: SummaryRepository,
    private readonly rmqService: RMQService) { }

  async getByQuery(dto: SummaryGetUserIdRequest): Promise<SummaryGetResponse> {
    const { from, to } = Time.monthRange();
    const params: ISummaryFindByQueryParams = {
      userId: dto.userId,
      date: {
        $gte: dto.from ? Time.dayRange(dto.from).from : from,
        $lte: dto.to ? Time.dayRange(dto.to).to : to
      }
    };

    if (dto.recalculate) {
      await this.recalculate(params);
    }

    const { data, totalTime } = await this.summaryRepository.findByQuery(params) ?? { data: [], totalTime: 0 };

    return {
      data: data.map(summary => new SummaryEntity(summary).entity),
      totalTime
    };
  }

  async createOrDelete(dto: SummaryUserId): Promise<void> {
    const date = Time.dayRange(dto.date).from;
    const existedSummary = await this.summaryRepository.findByDate(date, dto.userId);
    if (!existedSummary && dto.time) {
      const summaryEntity = new SummaryEntity({ ...dto, date });
      await this.summaryRepository.create(summaryEntity);
    } else if (existedSummary && dto.time) {
      const summaryEntity = new SummaryEntity(existedSummary).updateTime(dto.time);
      await this.summaryRepository.update(summaryEntity);
    } else if (existedSummary && !dto.time) {
      await this.summaryRepository.delete(existedSummary._id as string);
    }
  }

  private async recalculate({ userId, date }: ISummaryFindByQueryParams): Promise<void> {
    const dates = Time.datesInRange(date.$gte, date.$lte);
    for (const date of dates) {
      const { totalTime: time } = await this.rmqService.send<TimestampGetUserIdRequest, TimestampGetResponse>(
        TimestampGetTopic, { userId, date }
      );
      await this.createOrDelete({ userId, date, time });
    }
  }
}
