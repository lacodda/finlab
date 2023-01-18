import { WorkTimeTimestampCreate, WorkTimeTimestampDelete, WorkTimeTimestampGetById, WorkTimeTimestampGetByQuery, WorkTimeTimestampUpdate } from '@finlab/contracts';
import { ITimestampFindByQueryParams } from '@finlab/interfaces';
import { Time } from '@finlab/helpers';
import { Injectable } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { TimestampEntity } from './entities/timestamp.entity';
import { TimestampsEntity } from './entities/timestamps.entity';
import { TimestampRepository } from './repositories/timestamp.repository';

@Injectable()
export class TimestampService {
  constructor(private readonly timestampRepository: TimestampRepository) { }

  async create(dto: WorkTimeTimestampCreate.Request): Promise<WorkTimeTimestampCreate.Response> {
    const timestamp = new Date(dto.timestamp);
    const existedWorkTime = await this.timestampRepository.findByDate(timestamp, dto.userId);
    if (existedWorkTime) {
      throw new Error('This timestamp is already created');
    }
    const newTimestampEntity = await new TimestampEntity({ ...dto, timestamp });
    const newTimestamp = await this.timestampRepository.create(newTimestampEntity);

    return { data: new TimestampEntity(newTimestamp).entity };
  }

  async update(dto: WorkTimeTimestampUpdate.Request): Promise<WorkTimeTimestampUpdate.Response> {
    const existedTimestamp = await this.timestampRepository.findById(dto.id);
    if (!existedTimestamp) {
      throw new Error('Unable to update non-existing entry');
    }
    const timestampEntity = new TimestampEntity(existedTimestamp).updateType(dto.type);
    await this.updateTimestamp(timestampEntity);

    return { data: timestampEntity.entity };
  }

  async getByQuery(dto: WorkTimeTimestampGetByQuery.Request): Promise<WorkTimeTimestampGetByQuery.Response> {
    const dayRange = Time.dayRangeISO(dto.date);
    const raw = (dto.raw as unknown as string) === 'true';
    console.log('dto.raw', typeof raw, raw);

    const params: ITimestampFindByQueryParams = {
      userId: dto.userId,
      timestamp: {
        $gte: dayRange.from,
        $lte: dayRange.to
      }
    };

    const timestampArray = await this.timestampRepository.findByQuery(params);
    const timestampsEntity = new TimestampsEntity(timestampArray, 10);

    if (raw) {
      const { timestamps: data, totalTime } = timestampsEntity.result();
      return { data, totalTime };
    }

    const { timestamps: data, totalTime } = timestampsEntity.process().result();
    return { data, totalTime };
  }

  async getById(dto: WorkTimeTimestampGetById.Request): Promise<WorkTimeTimestampGetById.Response> {
    const existedTimestamp = await this.timestampRepository.findById(dto.id);
    if (!existedTimestamp) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new TimestampEntity(existedTimestamp).entity };
  }

  async delete(dto: WorkTimeTimestampDelete.Request): Promise<WorkTimeTimestampDelete.Response> {
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
