import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  type TaskCreateRequest, type TaskCreateResponse, TaskCreateTopic, type TaskGetRequest, type TaskGetResponse,
  TaskGetTopic, type TaskGetOneRequest, type TaskGetOneResponse, TaskGetOneTopic, type TaskUpdateRequest, type TaskUpdateResponse,
  TaskUpdateTopic, type TaskDeleteRequest, type TaskDeleteResponse, TaskDeleteTopic
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
  @Post()
  async create(@Body() dto: Omit<TaskCreateRequest, 'userId'>, @UserId() userId: string): Promise<TaskCreateResponse | undefined> {
    try {
      return await this.rmqService.send<TaskCreateRequest, TaskCreateResponse>(TaskCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Omit<TaskUpdateRequest, 'id'>): Promise<TaskUpdateResponse | undefined> {
    try {
      return await this.rmqService.send<TaskUpdateRequest, TaskUpdateResponse>(TaskUpdateTopic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByQuery(@Query() dto: Omit<TaskGetRequest, 'userId'>, @UserId() userId: string): Promise<TaskGetResponse | undefined> {
    try {
      return await this.rmqService.send<TaskGetRequest, TaskGetResponse>(TaskGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<TaskGetOneResponse | undefined> {
    try {
      return await this.rmqService.send<TaskGetOneRequest, TaskGetOneResponse>(TaskGetOneTopic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TaskDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<TaskDeleteRequest, TaskDeleteResponse>(TaskDeleteTopic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
