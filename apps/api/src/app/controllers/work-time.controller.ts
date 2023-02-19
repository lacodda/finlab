import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  SummaryCreate, SummaryGetByQuery, SummaryGetById, SummaryUpdate, SummaryDelete, SummaryRecalculate,
  TaskCreate, TaskDelete, TaskGetById, TaskGetByQuery, TaskUpdate,
  TimestampCreate, TimestampDelete, TimestampGetById, TimestampGetByQuery, TimestampUpdate
} from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly rmqService: RMQService) { }

  // Task

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Post('task')
  async createTask(@Body() dto: Omit<TaskCreate.Request, 'userId'>, @UserId() userId: string): Promise<TaskCreate.Response | undefined> {
    try {
      return await this.rmqService.send<TaskCreate.Request, TaskCreate.Response>(TaskCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Patch('task/:id')
  async updateTask(@Param('id') id: string, @Body() dto: Omit<TaskUpdate.Request, 'id'>): Promise<TaskUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<TaskUpdate.Request, TaskUpdate.Response>(TaskUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get('task')
  async getTaskByQuery(@Query() dto: Omit<TaskGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<TaskGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<TaskGetByQuery.Request, TaskGetByQuery.Response>(TaskGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get('task/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskGetById.Response | undefined> {
    try {
      return await this.rmqService.send<TaskGetById.Request, TaskGetById.Response>(TaskGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Delete('task/:id')
  async deleteTask(@Param('id') id: string): Promise<TaskDelete.Response | undefined> {
    try {
      return await this.rmqService.send<TaskDelete.Request, TaskDelete.Response>(TaskDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  // Timestamp
  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Post('timestamp')
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: TimestampCreate.Response
  })
  async createTimestamp(@Body() dto: Omit<TimestampCreate.Request, 'userId'>, @UserId() userId: string): Promise<TimestampCreate.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampCreate.Request, TimestampCreate.Response>(TimestampCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Patch('timestamp/:id')
  async updateTimestamp(@Param('id') id: string, @Body() dto: Omit<TimestampUpdate.Request, 'id'>): Promise<TimestampUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampUpdate.Request, TimestampUpdate.Response>(TimestampUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Get('timestamp')
  async getTimestampByQuery(@Query() dto: Omit<TimestampGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<TimestampGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampGetByQuery.Request, TimestampGetByQuery.Response>(TimestampGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Get('timestamp/:id')
  async getTimestampById(@Param('id') id: string): Promise<TimestampGetById.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampGetById.Request, TimestampGetById.Response>(TimestampGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Delete('timestamp/:id')
  async deleteTimestamp(@Param('id') id: string): Promise<TimestampDelete.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampDelete.Request, TimestampDelete.Response>(TimestampDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  // Summary

  @ApiTags('summary')
  @UseGuards(JwtAuthGuard)
  @Post('summary')
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
  @Patch('summary/:id')
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
  @Get('summary/recalculate')
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
  @Get('summary')
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
  @Get('summary/:id')
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
  @Delete('summary/:id')
  async deleteSummary(@Param('id') id: string): Promise<SummaryDelete.Response | undefined> {
    try {
      return await this.rmqService.send<SummaryDelete.Request, SummaryDelete.Response>(SummaryDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
