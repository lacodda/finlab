import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { CalendarCreate, CalendarDelete, CalendarGetById, CalendarGetByQuery, CalendarUpdate } from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserId } from '../../guards/user.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('work-time/calendar')
export class WorkTimeCalendarController {
  constructor(private readonly rmqService: RMQService) { }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: CalendarCreate.Response
  })
  async createCalendar(@Body() dto: Omit<CalendarCreate.Request, 'userId'>, @UserId() userId: string): Promise<CalendarCreate.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarCreate.Request, CalendarCreate.Response>(CalendarCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCalendar(@Param('id') id: string, @Body() dto: Omit<CalendarUpdate.Request, 'id'>): Promise<CalendarUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarUpdate.Request, CalendarUpdate.Response>(CalendarUpdate.topic, { ...dto, id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCalendarByQuery(@Query() dto: Omit<CalendarGetByQuery.Request, 'userId'>, @UserId() userId: string): Promise<CalendarGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarGetByQuery.Request, CalendarGetByQuery.Response>(CalendarGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCalendarById(@Param('id') id: string): Promise<CalendarGetById.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarGetById.Request, CalendarGetById.Response>(CalendarGetById.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCalendar(@Param('id') id: string): Promise<CalendarDelete.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarDelete.Request, CalendarDelete.Response>(CalendarDelete.topic, { id });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
