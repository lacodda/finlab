import { Get, Param, Delete, Patch, Query, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { WorkTimeCreate, WorkTimeGetByQuery, WorkTimeGetById, WorkTimeUpdate, WorkTimeDelete } from '@finlab/contracts';
import { RMQService } from 'nestjs-rmq';

@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly rmqService: RMQService) {}

  @Post()
  async create(@Body() dto: WorkTimeCreate.Request): Promise<WorkTimeCreate.Response | void> {
    try {
      return await this.rmqService.send<WorkTimeCreate.Request, WorkTimeCreate.Response>(WorkTimeCreate.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Omit<WorkTimeUpdate.Request, 'id'>): Promise<WorkTimeUpdate.Response | void> {
    try {
      return await this.rmqService.send<WorkTimeUpdate.Request, WorkTimeUpdate.Response>(WorkTimeUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Get()
  async getByQuery(@Query() dto: WorkTimeGetByQuery.Request): Promise<WorkTimeGetByQuery.Response | void> {
    try {
      return await this.rmqService.send<WorkTimeGetByQuery.Request, WorkTimeGetByQuery.Response>(WorkTimeGetByQuery.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<WorkTimeGetById.Response | void> {
    try {
      return await this.rmqService.send<WorkTimeGetById.Request, WorkTimeGetById.Response>(WorkTimeGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<WorkTimeDelete.Response | void> {
    try {
      return await this.rmqService.send<WorkTimeDelete.Request, WorkTimeDelete.Response>(WorkTimeDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
