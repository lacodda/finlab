import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  TimestampCreateRequest, TimestampCreateResponse, TimestampCreateTopic, type TimestampCreateUserIdRequest, TimestampDeleteRequest,
  TimestampDeleteResponse, TimestampDeleteTopic, type TimestampDeleteUserIdRequest, TimestampGetRequest, TimestampGetResponse,
  TimestampGetTopic, type TimestampGetUserIdRequest, TimestampUpdateRequestBody, TimestampUpdateRequestParam, TimestampUpdateResponse,
  TimestampUpdateTopic, type TimestampUpdateUserIdRequest
} from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserId } from '../../guards/user.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('work-time/timestamp')
export class WorkTimeTimestampController {
  constructor(private readonly rmqService: RMQService) { }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Timestamps',
    type: TimestampGetResponse
  })
  async getByQuery(@Query() dto: TimestampGetRequest, @UserId() userId: string): Promise<TimestampGetResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampGetUserIdRequest, TimestampGetResponse>(TimestampGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create timestamp',
    type: TimestampCreateResponse
  })
  async create(@Body() dto: TimestampCreateRequest, @UserId() userId: string): Promise<TimestampCreateResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampCreateUserIdRequest, TimestampCreateResponse>(TimestampCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Patch(':timestamp')
  @ApiResponse({
    status: 200,
    description: 'Update timestamp',
    type: TimestampUpdateResponse
  })
  async update(@Param() param: TimestampUpdateRequestParam, @Body() body: TimestampUpdateRequestBody, @UserId() userId: string): Promise<TimestampUpdateResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampUpdateUserIdRequest, TimestampUpdateResponse>(TimestampUpdateTopic, { ...param, ...body, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Delete(':timestamp')
  @ApiResponse({
    status: 200,
    description: 'Delete timestamp',
    type: TimestampDeleteResponse
  })
  async delete(@Param() dto: TimestampDeleteRequest, @UserId() userId: string): Promise<TimestampDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampDeleteUserIdRequest, TimestampDeleteResponse>(TimestampDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
