import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { type TotalTimeEntity } from './entities/total-time.entity';

@Injectable()
export class TotalTimeEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle(totalTime: TotalTimeEntity): Promise<void> {
    for (const event of totalTime.events) {
      await this.rmqService.notify(event.topic, event.data);
    }
  }
}
