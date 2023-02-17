import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { type TimestampEntity } from './entities/timestamp.entity';

@Injectable()
export class TimestampEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle(timestamp: TimestampEntity): Promise<void> {
    for (const event of timestamp.events) {
      await this.rmqService.notify(event.topic, event.data);
    }
  }
}
