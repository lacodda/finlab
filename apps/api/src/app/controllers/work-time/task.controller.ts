import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { TaskCreate, TaskDelete, TaskGetById, TaskGetByQuery, TaskUpdate } from '@finlab/contracts/work-time';
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
  @Patch(':id')
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
  @Get()
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
  @Get(':id')
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
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<TaskDelete.Response | undefined> {
    try {
      return await this.rmqService.send<TaskDelete.Request, TaskDelete.Response>(TaskDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
