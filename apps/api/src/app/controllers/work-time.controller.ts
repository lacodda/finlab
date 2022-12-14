import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards, Logger } from '@nestjs/common';
import { WorkTimeCreate, WorkTimeGetByQuery, WorkTimeGetById, WorkTimeUpdate, WorkTimeDelete, WorkTimeTaskCreate, WorkTimeTaskDelete, WorkTimeTaskGetById, WorkTimeTaskGetByQuery, WorkTimeTaskUpdate } from '@finlab/contracts';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly rmqService: RMQService) { }

  // Task

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

  @UseGuards(JwtAuthGuard)
  @Get('task')
  async getTaskByQuery(@Query() dto: Omit<WorkTimeTaskGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeTaskGetByQuery.Response | undefined> {
    console.log('dto', dto)
    try {
      return await this.rmqService.send<WorkTimeTaskGetByQuery.Request, WorkTimeTaskGetByQuery.Response>(WorkTimeTaskGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

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

  // Work-time

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
