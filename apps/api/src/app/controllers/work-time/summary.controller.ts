import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { SummaryCreate, SummaryGetByQuery, SummaryGetById, SummaryUpdate, SummaryDelete, SummaryRecalculate } from '@finlab/contracts/work-time';
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
  @Post()
  async createSummary(@Body() dto: Omit<SummaryCreate.Request, 'userId'>, @UserId() userId: string): Promise<SummaryCreate.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryCreate.Request, SummaryCreate.Response>(SummaryCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateSummary(@Param('id') id: string, @Body() dto: Omit<SummaryUpdate.Request, 'id'>): Promise<SummaryUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryUpdate.Request, SummaryUpdate.Response>(SummaryUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get('recalculate')
  async recalculateSummary(@Query() dto: Omit<SummaryRecalculate.Request, 'userId'>, @UserId() userId: string): Promise<SummaryRecalculate.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryRecalculate.Request, SummaryRecalculate.Response>(SummaryRecalculate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByQuerySummary(@Query() dto: Omit<SummaryGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<SummaryGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryGetByQuery.Request, SummaryGetByQuery.Response>(SummaryGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getByIdSummary(@Param('id') id: string): Promise<SummaryGetById.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryGetById.Request, SummaryGetById.Response>(SummaryGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSummary(@Param('id') id: string, @UserId() userId: string): Promise<SummaryDelete.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryDelete.Request, SummaryDelete.Response>(SummaryDelete.topic, { id, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
