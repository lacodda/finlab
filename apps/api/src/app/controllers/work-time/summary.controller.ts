import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  SummaryCreateRequest, type SummaryCreateResponse, SummaryCreateTopic, type SummaryCreateUserIdRequest,
  SummaryDeleteRequest, type SummaryDeleteResponse, SummaryDeleteTopic, type SummaryDeleteUserIdRequest, SummaryGetByQueryRequest,
  type SummaryGetByQueryResponse, SummaryGetByQueryTopic, type SummaryGetByQueryUserIdRequest, SummaryGetOneRequest,
  type SummaryGetOneResponse, SummaryGetOneTopic, type SummaryGetOneUserIdRequest, SummaryUpdateRequestBody,
  SummaryUpdateRequestParam, type SummaryUpdateResponse, SummaryUpdateTopic, type SummaryUpdateUserIdRequest, SummaryRecalculateRequest,
  type SummaryRecalculateResponse, SummaryRecalculateTopic, type SummaryRecalculateUserIdRequest
} from '@finlab/contracts/work-time';
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
  async create(@Body() dto: SummaryCreateRequest, @UserId() userId: string): Promise<SummaryCreateResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryCreateUserIdRequest, SummaryCreateResponse>(SummaryCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Patch(':date')
  async update(@Param() param: SummaryUpdateRequestParam, @Body() body: SummaryUpdateRequestBody, @UserId() userId: string): Promise<SummaryUpdateResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryUpdateUserIdRequest, SummaryUpdateResponse>(SummaryUpdateTopic, { ...param, ...body, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get('recalculate')
  async recalculate(@Query() dto: SummaryRecalculateRequest, @UserId() userId: string): Promise<SummaryRecalculateResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryRecalculateUserIdRequest, SummaryRecalculateResponse>(SummaryRecalculateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByQuery(@Query() dto: SummaryGetByQueryRequest, @UserId() userId: string): Promise<SummaryGetByQueryResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryGetByQueryUserIdRequest, SummaryGetByQueryResponse>(SummaryGetByQueryTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Get(':date')
  async getOne(@Param() dto: SummaryGetOneRequest, @UserId() userId: string): Promise<SummaryGetOneResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryGetOneUserIdRequest, SummaryGetOneResponse>(SummaryGetOneTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Delete(':date')
  async delete(@Param() dto: SummaryDeleteRequest, @UserId() userId: string): Promise<SummaryDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryDeleteUserIdRequest, SummaryDeleteResponse>(SummaryDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
