import { Get, Query, Controller, BadRequestException, UseGuards } from '@nestjs/common';
import { SummaryGetRequest, type SummaryGetResponse, SummaryGetTopic, type SummaryGetUserIdRequest } from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserId } from '../../guards/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('work-time/summary')
export class WorkTimeSummaryController {
  constructor(private readonly rmqService: RMQService) { }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByQuery(@Query() dto: SummaryGetRequest, @UserId() userId: string): Promise<SummaryGetResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryGetUserIdRequest, SummaryGetResponse>(SummaryGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
