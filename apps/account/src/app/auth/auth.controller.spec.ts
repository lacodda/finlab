import { Test, type TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RMQModule, RMQService, type RMQTestService } from 'nestjs-rmq';
import { getMongoConfig } from '../configs/mongo.config';
import { type INestApplication } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { type AccountLoginRequest, type AccountLoginResponse, AccountLoginTopic, type AccountRegisterRequest, type AccountRegisterResponse, AccountRegisterTopic } from '@finlab/contracts';

const authLogin: AccountLoginRequest = {
  email: 'admin2@mail.com',
  password: '1'
};
const authRegister: AccountRegisterRequest = {
  ...authLogin,
  displayName: 'Admin2'
};

describe('AuthController', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  let rmqService: RMQTestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
        MongooseModule.forRootAsync(getMongoConfig()),
        RMQModule.forTest({}),
        UserModule,
        AuthModule
      ]
    }).compile();

    app = module.createNestApplication();
    userRepository = app.get<UserRepository>(UserRepository);
    rmqService = app.get(RMQService);
    await app.init();
  });

  it('Register', async () => {
    const res = await rmqService.triggerRoute<AccountRegisterRequest, AccountRegisterResponse>(AccountRegisterTopic, authRegister);
    expect(res.email).toEqual(authRegister.email);
  });

  it('Login', async () => {
    const res = await rmqService.triggerRoute<AccountLoginRequest, AccountLoginResponse>(AccountLoginTopic, authLogin);
    expect(res.access_token).toBeDefined();
  });

  afterAll(async () => {
    await userRepository.deleteUser(authRegister.email);
    void app.close();
  });
});
