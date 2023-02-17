import { type TimestampCreate, type TimestampDelete, type TimestampGetById, type TimestampGetByQuery, type TimestampUpdate } from '@finlab/contracts/work-time';
import { type ITimestamp, type ITimestampFindByQueryParams, type TimestampType } from '@finlab/interfaces/work-time';
import { Time } from '@finlab/helpers';
import { Injectable } from '@nestjs/common';
import { type UpdateWriteOpResult } from 'mongoose';
import { TimestampEntity } from './entities/timestamp.entity';
import { TimestampsEntity } from './entities/timestamps.entity';
import { TimestampRepository } from './repositories/timestamp.repository';

const MIN_BREAK_TIME = 20; // FIXME move to settings

@Injectable()
export class TimestampService {
  constructor(private readonly timestampRepository: TimestampRepository) { }

  async create(dto: TimestampCreate.Request): Promise<TimestampCreate.Response> {
    const timestamp = new Date(dto.timestamp);
    const existedTimestamp = await this.timestampRepository.findByDate(timestamp, dto.userId);
    if (existedTimestamp) {
      const data = await this.updateType(existedTimestamp, dto.type);
      return { data };
    }
    const newTimestampEntity = new TimestampEntity({ ...dto, timestamp });
    const newTimestamp = await this.timestampRepository.create(newTimestampEntity);

    return { data: new TimestampEntity(newTimestamp).entity };
  }

  async update(dto: TimestampUpdate.Request): Promise<TimestampUpdate.Response> {
    const existedTimestamp = await this.timestampRepository.findById(dto.id);
    if (!existedTimestamp) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateType(existedTimestamp, dto.type);

    return { data };
  }

  async updateType(timestamp: ITimestamp, type: TimestampType): Promise<Omit<ITimestamp, 'userId'>> {
    const timestampEntity = new TimestampEntity(timestamp).updateType(type);
    await this.updateTimestamp(timestampEntity);
    return timestampEntity.entity;
  }

  async getByQuery(dto: TimestampGetByQuery.Request): Promise<TimestampGetByQuery.Response> {
    const dayRange = Time.dayRangeISO(dto.date);
    const raw = (dto.raw as unknown as string) === 'true';

    const params: ITimestampFindByQueryParams = {
      userId: dto.userId,
      timestamp: {
        $gte: dayRange.from,
        $lte: dayRange.to
      }
    };

    const timestampArray = await this.timestampRepository.findByQuery(params);
    const timestampsEntity = new TimestampsEntity(timestampArray, MIN_BREAK_TIME);

    if (raw) {
      const { timestamps: data, workTime, breaks, totalTime } = timestampsEntity.result();
      return { data, workTime, breaks, totalTime };
    }

    const { timestamps: data, workTime, breaks, totalTime } = timestampsEntity.process().result();
    return { data, workTime, breaks, totalTime };
  }

  async getById(dto: TimestampGetById.Request): Promise<TimestampGetById.Response> {
    const existedTimestamp = await this.timestampRepository.findById(dto.id);
    if (!existedTimestamp) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new TimestampEntity(existedTimestamp).entity };
  }

  async delete(dto: TimestampDelete.Request): Promise<TimestampDelete.Response> {
    const existedTimestamp = await this.timestampRepository.findById(dto.id);
    if (!existedTimestamp) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.timestampRepository.delete(dto.id);

    return { data: { _id: existedTimestamp._id } };
  }

  private async updateTimestamp(timestamp: TimestampEntity): Promise<[UpdateWriteOpResult]> {
    return await Promise.all(
      [
        this.timestampRepository.update(timestamp)
      ]
    );
  }
}
