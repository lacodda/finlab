import {
  type TimestampCreateResponse, TimestampCreateTopic, TimestampCreateUserIdRequest, type TimestampDeleteResponse,
  TimestampDeleteTopic, TimestampDeleteUserIdRequest, type TimestampGetResponse, TimestampGetTopic,
  TimestampGetUserIdRequest, type TimestampGetOneResponse, TimestampGetOneTopic, TimestampGetOneUserIdRequest,
  type TimestampUpdateResponse, TimestampUpdateTopic, TimestampUpdateUserIdRequest
} from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TimestampService } from './timestamp.service';

@Controller('timestamp')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) { }

  @RMQValidate()
  @RMQRoute(TimestampCreateTopic)
  async create(@Body() dto: TimestampCreateUserIdRequest): Promise<TimestampCreateResponse> {
    return await this.timestampService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampUpdateTopic)
  async update(@Body() dto: TimestampUpdateUserIdRequest): Promise<TimestampUpdateResponse> {
    return await this.timestampService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampGetTopic)
  async getByQuery(@Body() dto: TimestampGetUserIdRequest): Promise<TimestampGetResponse> {
    return await this.timestampService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampGetOneTopic)
  async getOne(@Body() dto: TimestampGetOneUserIdRequest): Promise<TimestampGetOneResponse> {
    return await this.timestampService.getOne(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampDeleteTopic)
  async delete(@Body() dto: TimestampDeleteUserIdRequest): Promise<TimestampDeleteResponse> {
    return await this.timestampService.delete(dto);
  }
}
