import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  TaskGetRequest, type TaskGetResponse, type TaskGetUserIdRequest, TaskGetTopic, TaskCreateRequest, type TaskCreateResponse,
  type TaskCreateUserIdRequest, TaskCreateTopic, TaskUpdateRequestParam, TaskUpdateRequestBody, type TaskUpdateResponse,
  type TaskUpdateUserIdRequest, TaskUpdateTopic, TaskDeleteRequest, type TaskDeleteResponse, type TaskDeleteUserIdRequest, TaskDeleteTopic
} from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserId } from '../../guards/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('work-time/task')
export class WorkTimeTaskController {
  constructor(private readonly rmqService: RMQService) { }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByQuery(@Query() dto: TaskGetRequest, @UserId() userId: string): Promise<TaskGetResponse | undefined> {
    try {
      return await this.rmqService.send<TaskGetUserIdRequest, TaskGetResponse>(TaskGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: TaskCreateRequest, @UserId() userId: string): Promise<TaskCreateResponse | undefined> {
    try {
      return await this.rmqService.send<TaskCreateUserIdRequest, TaskCreateResponse>(TaskCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param() param: TaskUpdateRequestParam, @Body() body: TaskUpdateRequestBody, @UserId() userId: string): Promise<TaskUpdateResponse | undefined> {
    try {
      return await this.rmqService.send<TaskUpdateUserIdRequest, TaskUpdateResponse>(TaskUpdateTopic, { ...param, ...body, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() dto: TaskDeleteRequest, @UserId() userId: string): Promise<TaskDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<TaskDeleteUserIdRequest, TaskDeleteResponse>(TaskDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
