import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { type CalendarDayEntity } from './entities/calendar-day.entity';

@Injectable()
export class CalendarEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle(calendarDayEntity: CalendarDayEntity): Promise<void> {
    for (const event of calendarDayEntity.events) {
      await this.rmqService.notify(event.topic, event.data);
    }
  }
}
