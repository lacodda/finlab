import { Get, Param, Delete, Patch, Query, Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { WorkTimeCreate, WorkTimeGetByQuery, WorkTimeGetById, WorkTimeUpdate, WorkTimeDelete } from '@finlab/contracts';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly rmqService: RMQService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: Omit<WorkTimeCreate.Request, 'userId'>, @UserId() userId: string): Promise<WorkTimeCreate.Response | undefined> {
    try {
      return await this.rmqService.send<WorkTimeCreate.Request, WorkTimeCreate.Response>(WorkTimeCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
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
        throw new UnauthorizedException(error.message);
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
        throw new UnauthorizedException(error.message);
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
        throw new UnauthorizedException(error.message);
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
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
