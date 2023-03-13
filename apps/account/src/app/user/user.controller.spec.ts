import { Test, type TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQModule, RMQService, type RMQTestService } from 'nestjs-rmq';
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../configs/mongo.config';
import { type INestApplication } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import {
  AccountAddApp, type AccountLoginRequest, type AccountLoginResponse, AccountLoginTopic, type AccountRegisterRequest,
  type AccountRegisterResponse, AccountRegisterTopic, AccountUserInfo, AppGetApp
} from '@finlab/contracts';
import { type Secret, verify } from 'jsonwebtoken';

const authLogin: AccountLoginRequest = {
  email: 'admin3@mail.com',
  password: '1'
};

const authRegister: AccountRegisterRequest = {
  ...authLogin,
  displayName: 'Admin3'
};

const appId = 'appId';

describe('UserController', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  let rmqService: RMQTestService;
  let configService: ConfigService;
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
        RMQModule.forTest({}),
        UserModule,
        AuthModule,
        MongooseModule.forRootAsync(getMongoConfig())
      ]
    }).compile();
    app = module.createNestApplication();
    userRepository = app.get<UserRepository>(UserRepository);
    rmqService = app.get(RMQService);
    configService = app.get<ConfigService>(ConfigService);
    await app.init();

    await rmqService.triggerRoute<AccountRegisterRequest, AccountRegisterResponse>(
      AccountRegisterTopic,
      authRegister
    );
    const res = await rmqService.triggerRoute<AccountLoginRequest, AccountLoginResponse>(
      AccountLoginTopic,
      authLogin
    );
    token = res.access_token;
    const data = verify(token, configService.get('JWT_SECRET') as Secret);
    userId = (data as { id: string }).id;
  });

  it('AccountUserInfo', async () => {
    const res = await rmqService.triggerRoute<AccountUserInfo.Request, AccountUserInfo.Response>(
      AccountUserInfo.topic,
      { id: userId }
    );
    expect(res.user.displayName).toEqual(authRegister.displayName);
  });

  it('AddApp', async () => {
    rmqService.mockReply<AppGetApp.Response>(AppGetApp.topic, {
      app: {
        _id: appId,
        name: 'app'
      }
    });

    await expect(
      rmqService.triggerRoute<AccountAddApp.Request, AccountAddApp.Response>(
        AccountAddApp.topic,
        { userId, appId }
      )
    ).rejects.toThrowError();
  });

  afterAll(async () => {
    await userRepository.deleteUser(authRegister.email);
    void app.close();
  });
});
