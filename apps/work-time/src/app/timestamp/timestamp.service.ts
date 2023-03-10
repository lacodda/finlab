import {
  type Timestamp,
  type TimestampCreateResponse, type TimestampCreateUserIdRequest, type TimestampDeleteResponse, type TimestampDeleteUserIdRequest,
  type TimestampGetResponse, type TimestampGetUserIdRequest, type TimestampUpdateResponse, type TimestampUpdateUserIdRequest
} from '@finlab/contracts/work-time';
import { type ITimestamp, type ITimestampFindByQueryParams, type TimestampType } from '@finlab/interfaces/work-time';
import { Time } from '@finlab/helpers';
import { Injectable } from '@nestjs/common';
import { TimestampEntity } from './entities/timestamp.entity';
import { TimestampsEntity } from './entities/timestamps.entity';
import { TimestampRepository } from './repositories/timestamp.repository';
import { TotalTimeEventEmitter } from './total-time.event-emitter';
import { TotalTimeEntity } from './entities/total-time.entity';

const MIN_BREAK_TIME = 20; // FIXME move to settings

@Injectable()
export class TimestampService {
  constructor(
    private readonly timestampRepository: TimestampRepository,
    private readonly totalTimeEventEmitter: TotalTimeEventEmitter
  ) { }

  async getByQuery(dto: TimestampGetUserIdRequest): Promise<TimestampGetResponse> {
    const dayRange = Time.dayRangeISO(dto.date);
    const params: ITimestampFindByQueryParams = {
      userId: dto.userId,
      timestamp: {
        $gte: dayRange.from,
        $lte: dayRange.to
      }
    };

    const timestampArray = await this.timestampRepository.findByQuery(params);
    const timestampsEntity = new TimestampsEntity(timestampArray, MIN_BREAK_TIME);

    if (dto.raw) {
      const { timestamps: data, workTime, breaks, totalTime } = timestampsEntity.result();
      return { data, workTime, breaks, totalTime };
    }

    const { timestamps: data, workTime, breaks, totalTime } = timestampsEntity.process().result();

    return { data, workTime, breaks, totalTime };
  }

  async create(dto: TimestampCreateUserIdRequest): Promise<TimestampCreateResponse> {
    const existedTimestamp = await this.timestampRepository.findByDate(dto.timestamp, dto.userId);
    if (existedTimestamp) {
      const data = await this.updateType(existedTimestamp, dto.type);
      return { data };
    }
    const newTimestampEntity = new TimestampEntity({ ...dto });
    const newTimestamp = await this.timestampRepository.create(newTimestampEntity);
    void this.changeTotalTime(newTimestamp);

    return { data: new TimestampEntity(newTimestamp).entity };
  }

  async update(dto: TimestampUpdateUserIdRequest): Promise<TimestampUpdateResponse> {
    const existedTimestamp = await this.timestampRepository.findByDate(dto.timestamp, dto.userId);
    if (!existedTimestamp) {
      throw new Error('Unable to update non-existing entry');
    }
    const data = await this.updateType(existedTimestamp, dto.type);

    return { data };
  }

  async delete(dto: TimestampDeleteUserIdRequest): Promise<TimestampDeleteResponse> {
    const existedTimestamp = await this.timestampRepository.findByDate(dto.timestamp, dto.userId);
    if (!existedTimestamp) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.timestampRepository.delete(existedTimestamp._id as string);
    void this.changeTotalTime(existedTimestamp);

    return { data: existedTimestamp };
  }

  private async updateType(timestamp: ITimestamp, type: TimestampType): Promise<Timestamp> {
    const timestampEntity = new TimestampEntity(timestamp).updateType(type);
    await this.timestampRepository.update(timestampEntity);
    void this.changeTotalTime(timestamp);

    return timestampEntity.entity;
  }

  private async changeTotalTime({ userId, timestamp: date }: ITimestamp): Promise<void> {
    const { totalTime: time } = await this.getByQuery({ userId, date });
    const totalTimeEntity = new TotalTimeEntity({ userId, date, time });
    await this.totalTimeEventEmitter.handle(totalTimeEntity);
  }
}
