import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService)
    }),
    inject: [ConfigService],
    imports: [ConfigModule]
  };
};

const getMongoString = (configService: ConfigService): string =>
  `mongodb://${String(configService.get('MONGO_LOGIN'))}
  :${String(configService.get('MONGO_PASSWORD'))}
  @${String(configService.get('MONGO_HOST'))}
  :${String(configService.get('MONGO_PORT'))}
  /${String(configService.get('MONGO_DATABASE'))}
  ?authSource=${String(configService.get('MONGO_AUTHDATABASE'))}`;
