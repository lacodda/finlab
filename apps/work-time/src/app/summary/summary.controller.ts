import { type SummaryGetResponse, SummaryGetTopic, SummaryGetUserIdRequest, TimestampChangedTotalTimeTopic, TimestampChangedTotalTimeUserIdRequest } from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @RMQValidate()
  @RMQRoute(SummaryGetTopic)
  async getByQuery(@Body() dto: SummaryGetUserIdRequest): Promise<SummaryGetResponse> {
    return await this.summaryService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampChangedTotalTimeTopic)
  async timestampChanged(@Body() dto: TimestampChangedTotalTimeUserIdRequest): Promise<void> {
    await this.summaryService.createOrDelete(dto);
  }
}
