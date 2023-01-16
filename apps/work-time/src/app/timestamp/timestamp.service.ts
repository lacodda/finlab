import { WorkTimeTimestampCreate, WorkTimeTimestampDelete, WorkTimeTimestampGetById, WorkTimeTimestampGetByQuery, WorkTimeTimestampUpdate } from '@finlab/contracts';
import { ITimestamp, ITimestampFindByQueryParams } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { TimestampEntity } from './entities/timestamp.entity';
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
    const params: ITimestampFindByQueryParams = {
      userId: dto.userId
    };
    if (dto.from && dto.to) {
      params.timestamp = {
        $gte: new Date(dto.from).toISOString(),
        $lte: new Date(dto.to).toISOString()
      };
    }
    const timestampArray = await this.timestampRepository.findByQuery(params);
    const start = timestampArray.find(({ type }) => type === 'Start');
    const end = timestampArray.findLast(({ type }) => type === 'End');
    const timestampArrayGroups: ITimestamp[][] = timestampArray.reduce((acc: ITimestamp[][], timestamp, key) => {
      if (timestamp.type === 'StartBreak') {
        acc.push([timestamp]);
      }
      const prev = acc[acc.length - 1];
      if (timestamp.type === 'EndBreak' && prev && prev.length === 1) {
        prev.push(timestamp);
      }
      return acc;
    }, []).filter(({ length }) => length === 2);
    console.log('timestampArrayGroups', timestampArrayGroups);
    console.log('start', start);
    console.log('end', end);

    return { data: timestampArray.map(timestamp => new TimestampEntity(timestamp).entity) };
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
