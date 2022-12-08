import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { WorkTime } from './work-time.schema';
import { CreateWorkTimeDto, UpdateWorkTimeDto, RangeDto } from './dto';

@Injectable()
export class WorkTimeService {
  constructor(
    @InjectModel(WorkTime.name) private readonly workTimeModel: Model<WorkTime>
  ) {}

  async create(dto: CreateWorkTimeDto) {
    const data = {
      date: new Date(dto.date),
      time: dto.time
    };
    const newWorkTime = new this.workTimeModel(data);
    try {
      const createdWorkTime = await newWorkTime.save();

      return createdWorkTime;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(dto: RangeDto) {
    let params = {};

    if (dto.from && dto.to) {
      params = {
        date: {
          $gte: new Date(dto.from).toISOString(),
          $lte: new Date(dto.to).toISOString()
        }
      };
    }

    let workTimes: WorkTime[];

    try {
      workTimes = await this.workTimeModel.find(params).exec();

      let response;

      if (workTimes.length > 0) {
        response = {
          ok: true,
          data: workTimes,
          message: 'Ok'
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'Empty'
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const workTime = await this.workTimeModel.findById(id).exec();

      return workTime;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, dto: UpdateWorkTimeDto) {
    const data = {
      time: dto.time
    };

    try {
      const workTime = await this.workTimeModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return workTime;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const workTime = await this.workTimeModel.findByIdAndRemove(id);

      return workTime;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
