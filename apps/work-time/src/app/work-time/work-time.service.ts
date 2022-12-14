import { WorkTimeCreate, WorkTimeDelete, WorkTimeGetById, WorkTimeGetByQuery, WorkTimeUpdate } from '@finlab/contracts';
import { IWorkTimeFindByQueryParams } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { WorkTimeEntity } from './entities/work-time.entity';
import { WorkTimeRepository } from './repositories/work-time.repository';

@Injectable()
export class WorkTimeService {
  constructor(private readonly workTimeRepository: WorkTimeRepository) { }

  async create(dto: WorkTimeCreate.Request): Promise<WorkTimeCreate.Response> {
    const date = new Date(new Date(dto.date).setUTCHours(0, 0, 0, 0));
    const existedWorkTime = await this.workTimeRepository.findByDate(date, dto.userId);
    if (existedWorkTime) {
      throw new Error('This date is already created');
    }
    const newWorkTimeEntity = await new WorkTimeEntity({ ...dto, date });
    const newWorkTime = await this.workTimeRepository.create(newWorkTimeEntity);

    return { data: new WorkTimeEntity(newWorkTime).entity };
  }

  async update(dto: WorkTimeUpdate.Request): Promise<WorkTimeUpdate.Response> {
    const existedWorkTime = await this.workTimeRepository.findById(dto.id);
    if (!existedWorkTime) {
      throw new Error('Unable to update non-existing entry');
    }
    const workTimeEntity = new WorkTimeEntity(existedWorkTime).updateTime(dto.time);
    await this.updateWorkTime(workTimeEntity);

    return { data: workTimeEntity.entity };
  }

  async getByQuery(dto: WorkTimeGetByQuery.Request): Promise<WorkTimeGetByQuery.Response> {
    const params: IWorkTimeFindByQueryParams = {
      userId: dto.userId
    };
    if (dto.from && dto.to) {
      params.date = {
        $gte: new Date(dto.from).toISOString(),
        $lte: new Date(dto.to).toISOString()
      };
    }
    const workTimeArray = await this.workTimeRepository.findByQuery(params);

    return { data: workTimeArray.map(workTime => new WorkTimeEntity(workTime).entity) };
  }

  async getById(dto: WorkTimeGetById.Request): Promise<WorkTimeGetById.Response> {
    const existedWorkTime = await this.workTimeRepository.findById(dto.id);
    if (!existedWorkTime) {
      throw new Error('Unable to delete non-existing entry');
    }

    return { data: new WorkTimeEntity(existedWorkTime).entity };
  }

  async delete(dto: WorkTimeDelete.Request): Promise<WorkTimeDelete.Response> {
    const existedWorkTime = await this.workTimeRepository.findById(dto.id);
    if (!existedWorkTime) {
      throw new Error('Unable to delete non-existing entry');
    }
    await this.workTimeRepository.delete(dto.id);

    return { data: { _id: existedWorkTime._id } };
  }

  private async updateWorkTime(workTime: WorkTimeEntity): Promise<[UpdateWriteOpResult]> {
    return await Promise.all(
      [
        this.workTimeRepository.update(workTime)
      ]
    );
  }
}
