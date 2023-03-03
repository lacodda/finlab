import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { TimestampCreate, TimestampDelete, TimestampGetById, TimestampGetByQuery, TimestampUpdate } from '@finlab/contracts/work-time';
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
  @Post()
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
  @Patch(':id')
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
  @Get()
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
  @Get(':id')
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
  @Delete(':id')
  async deleteTimestamp(@Param('id') id: string): Promise<TimestampDelete.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampDelete.Request, TimestampDelete.Response>(TimestampDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
