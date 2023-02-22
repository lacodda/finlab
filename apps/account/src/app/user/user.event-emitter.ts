import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { type UserEntity } from './entities/user.entity';

@Injectable()
export class UserEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle(user: UserEntity): Promise<void> {
    for (const event of user.events) {
      await this.rmqService.notify(event.topic, event.data);
    }
  }
}
