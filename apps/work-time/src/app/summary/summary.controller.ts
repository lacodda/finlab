import { SummaryCreate, SummaryDelete, SummaryGetById, SummaryGetByQuery, SummaryUpdate, TimestampChanged } from '@finlab/contracts/work-time';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @RMQValidate()
  @RMQRoute(SummaryCreate.topic)
  async create(@Body() dto: SummaryCreate.Request): Promise<SummaryCreate.Response> {
    return await this.summaryService.create(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryUpdate.topic)
  async update(@Body() dto: SummaryUpdate.Request): Promise<SummaryUpdate.Response> {
    return await this.summaryService.update(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryGetByQuery.topic)
  async getByQuery(@Body() dto: SummaryGetByQuery.Request): Promise<SummaryGetByQuery.Response> {
    return await this.summaryService.getByQuery(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryGetById.topic)
  async getById(@Body() dto: SummaryGetById.Request): Promise<SummaryGetById.Response> {
    return await this.summaryService.getById(dto);
  }

  @RMQValidate()
  @RMQRoute(SummaryDelete.topic)
  async delete(@Body() dto: SummaryDelete.Request): Promise<SummaryDelete.Response> {
    return await this.summaryService.delete(dto);
  }

  @RMQValidate()
  @RMQRoute(TimestampChanged.topic)
  async timestampChanged(@Body() dto: TimestampChanged.Request): Promise<void> {
    await this.summaryService.calculate(dto);
  }
}
