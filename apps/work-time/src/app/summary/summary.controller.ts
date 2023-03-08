import {
  type SummaryCreateResponse, SummaryCreateTopic, SummaryCreateUserIdRequest, type SummaryDeleteResponse, SummaryDeleteTopic,
  SummaryDeleteUserIdRequest, type SummaryGetByQueryResponse, SummaryGetByQueryTopic, SummaryGetByQueryUserIdRequest,
  type SummaryGetOneResponse, SummaryGetOneTopic, SummaryGetOneUserIdRequest, type SummaryRecalculateResponse, SummaryRecalculateTopic,
  SummaryRecalculateUserIdRequest, type SummaryUpdateResponse, SummaryUpdateTopic, SummaryUpdateUserIdRequest, TimestampChangedTotalTimeTopic,
  TimestampChangedTotalTimeUserIdRequest
} from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @RMQValidate()
  @RMQRoute(SummaryCreateTopic)
  async create(@Body() dto: SummaryCreateUserIdRequest): Promise<SummaryCreateResponse> {
    return await this.summaryService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryUpdateTopic)
  async update(@Body() dto: SummaryUpdateUserIdRequest): Promise<SummaryUpdateResponse> {
    return await this.summaryService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryGetByQueryTopic)
  async getByQuery(@Body() dto: SummaryGetByQueryUserIdRequest): Promise<SummaryGetByQueryResponse> {
    return await this.summaryService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryGetOneTopic)
  async getOne(@Body() dto: SummaryGetOneUserIdRequest): Promise<SummaryGetOneResponse> {
    return await this.summaryService.getOne(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryDeleteTopic)
  async delete(@Body() dto: SummaryDeleteUserIdRequest): Promise<SummaryDeleteResponse> {
    return await this.summaryService.delete(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampChangedTotalTimeTopic)
  async timestampChanged(@Body() dto: TimestampChangedTotalTimeUserIdRequest): Promise<void> {
    await this.summaryService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryRecalculateTopic)
  async recalculate(@Body() dto: SummaryRecalculateUserIdRequest): Promise<SummaryRecalculateResponse> {
    return await this.summaryService.recalculate(dto);
  }
}
