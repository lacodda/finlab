import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  WorkTimeCreate, WorkTimeGetByQuery, WorkTimeGetById, WorkTimeUpdate, WorkTimeDelete,
  WorkTimeTaskCreate, WorkTimeTaskDelete, WorkTimeTaskGetById, WorkTimeTaskGetByQuery, WorkTimeTaskUpdate,
  WorkTimeTimestampCreate, WorkTimeTimestampDelete, WorkTimeTimestampGetById, WorkTimeTimestampGetByQuery, WorkTimeTimestampUpdate
} from '@finlab/contracts';
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
  async createTask(@Body() dto: Omit<WorkTimeTaskCreate.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeTaskCreate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTaskCreate.Request, WorkTimeTaskCreate.Response>(WorkTimeTaskCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Patch('task/:id')
  async updateTask(@Param('id') id: string, @Body() dto: Omit<WorkTimeTaskUpdate.Request, 'id'>): Promise<WorkTimeTaskUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTaskUpdate.Request, WorkTimeTaskUpdate.Response>(WorkTimeTaskUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get('task')
  async getTaskByQuery(@Query() dto: Omit<WorkTimeTaskGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeTaskGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTaskGetByQuery.Request, WorkTimeTaskGetByQuery.Response>(WorkTimeTaskGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get('task/:id')
  async getTaskById(@Param('id') id: string): Promise<WorkTimeTaskGetById.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTaskGetById.Request, WorkTimeTaskGetById.Response>(WorkTimeTaskGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Delete('task/:id')
  async deleteTask(@Param('id') id: string): Promise<WorkTimeTaskDelete.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTaskDelete.Request, WorkTimeTaskDelete.Response>(WorkTimeTaskDelete.topic, { id });
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
    type: WorkTimeTimestampCreate.Response
  })
  async createTimestamp(@Body() dto: Omit<WorkTimeTimestampCreate.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeTimestampCreate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTimestampCreate.Request, WorkTimeTimestampCreate.Response>(WorkTimeTimestampCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Patch('timestamp/:id')
  async updateTimestamp(@Param('id') id: string, @Body() dto: Omit<WorkTimeTimestampUpdate.Request, 'id'>): Promise<WorkTimeTimestampUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTimestampUpdate.Request, WorkTimeTimestampUpdate.Response>(WorkTimeTimestampUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Get('timestamp')
  async getTimestampByQuery(@Query() dto: Omit<WorkTimeTimestampGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeTimestampGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTimestampGetByQuery.Request, WorkTimeTimestampGetByQuery.Response>(WorkTimeTimestampGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Get('timestamp/:id')
  async getTimestampById(@Param('id') id: string): Promise<WorkTimeTimestampGetById.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTimestampGetById.Request, WorkTimeTimestampGetById.Response>(WorkTimeTimestampGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('timestamp')
  @UseGuards(JwtAuthGuard)
  @Delete('timestamp/:id')
  async deleteTimestamp(@Param('id') id: string): Promise<WorkTimeTimestampDelete.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeTimestampDelete.Request, WorkTimeTimestampDelete.Response>(WorkTimeTimestampDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  // Work-time

  @ApiTags('work-time')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: Omit<WorkTimeCreate.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeCreate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeCreate.Request, WorkTimeCreate.Response>(WorkTimeCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('work-time')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Omit<WorkTimeUpdate.Request, 'id'>): Promise<WorkTimeUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeUpdate.Request, WorkTimeUpdate.Response>(WorkTimeUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('work-time')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByQuery(@Query() dto: Omit<WorkTimeGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeGetByQuery.Request, WorkTimeGetByQuery.Response>(WorkTimeGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('work-time')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<WorkTimeGetById.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeGetById.Request, WorkTimeGetById.Response>(WorkTimeGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('work-time')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<WorkTimeDelete.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeDelete.Request, WorkTimeDelete.Response>(WorkTimeDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
