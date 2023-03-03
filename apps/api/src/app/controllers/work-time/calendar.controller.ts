import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { CalendarCreate, CalendarDelete, CalendarGetByDate, CalendarGetByQuery, CalendarUpdate } from '@finlab/contracts/work-time';
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
  async createCalendar(@Body() dto: CalendarCreate.Request, @UserId() userId: string): Promise<CalendarCreate.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarCreate.UserIdRequest, CalendarCreate.Response>(CalendarCreate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Patch(':date')
  async updateCalendar(@Param() param: CalendarUpdate.RequestParam, @Body() body: CalendarUpdate.RequestBody, @UserId() userId: string): Promise<CalendarUpdate.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarUpdate.UserIdRequest, CalendarUpdate.Response>(CalendarUpdate.topic, { ...param, ...body, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCalendarByQuery(@Query() dto: CalendarGetByQuery.Request, @UserId() userId: string): Promise<CalendarGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarGetByQuery.UserIdRequest, CalendarGetByQuery.Response>(CalendarGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Get(':date')
  async getCalendarByDate(@Param() dto: CalendarGetByDate.Request, @UserId() userId: string): Promise<CalendarGetByDate.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarGetByDate.UserIdRequest, CalendarGetByDate.Response>(CalendarGetByDate.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Delete(':date')
  async deleteCalendar(@Param() dto: CalendarDelete.Request, @UserId() userId: string): Promise<CalendarDelete.Response | undefined> {
    try {
      return await this.rmqService.send<CalendarDelete.UserIdRequest, CalendarDelete.Response>(CalendarDelete.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
