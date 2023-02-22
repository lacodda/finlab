import { ConfigModule, ConfigService } from '@nestjs/config';
import { type IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRmqConfig = (): IRMQServiceAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        login: configService.get('AMQP_USER') ?? '',
        password: configService.get('AMQP_PASSWORD') ?? '',
        host: configService.get('AMQP_HOST') ?? ''
      }
    ],
    queueName: configService.get('AMQP_QUEUE'),
    prefetchCount: 32,
    serviceName: 'finlab-account'
  })
});
