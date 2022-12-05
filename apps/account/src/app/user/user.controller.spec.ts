import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../configs/mongo.config';
import { INestApplication } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AccountAddApp, AccountLogin, AccountRegister, AccountUserInfo, AppGetApp } from '@finlab/contracts';
import { verify } from 'jsonwebtoken';

const authLogin: AccountLogin.Request = {
  email: 'admin3@mail.com',
  password: '1'
};

const authRegister: AccountRegister.Request = {
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

    await rmqService.triggerRoute<AccountRegister.Request, AccountRegister.Response>(
      AccountRegister.topic,
      authRegister
    );
    const res = await rmqService.triggerRoute<AccountLogin.Request, AccountLogin.Response>(
      AccountLogin.topic,
      authLogin
    );
    token = res.access_token;
    const data = verify(token, configService.get('JWT_SECRET'));
    userId = (data as { id }).id;
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
