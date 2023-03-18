import { type AccountLoginRequest, type AccountRegisterResponse, AccountRegisterTopic, type AccountLoginResponse, AccountLoginTopic } from '@finlab/contracts';
import { Test, type TestingModule } from '@nestjs/testing';
import { RMQModule, RMQService, type RMQTestService } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import { type INestApplication } from '@nestjs/common';

const USER: AccountLoginRequest = {
  email: 'admin@email.com',
  password: '1'
};

const USER_EMAIL: AccountRegisterResponse = {
  email: USER.email
};

const ACCESS_TOKEN: AccountLoginResponse = {
  access_token: '123456'
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let rmqService: RMQTestService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.graphql.env' }),
        RMQModule.forTest({})
      ],
      providers: [
        AuthResolver
      ]
    }).compile();
    app = module.createNestApplication();
    resolver = module.get<AuthResolver>(AuthResolver);
    rmqService = app.get(RMQService);
    await app.init();

    rmqService.mockReply<AccountRegisterResponse>(AccountRegisterTopic, USER_EMAIL);
    rmqService.mockReply<AccountLoginResponse>(AccountLoginTopic, ACCESS_TOKEN);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to register a user', async () => {
    const res = await resolver.register(USER);
    expect(res?.email).toBeDefined();
    expect(res).toEqual(USER_EMAIL);
  });

  it('should be able to login a user', async () => {
    const res = await resolver.login(USER);
    expect(res?.access_token).toBeDefined();
    expect(res).toEqual(ACCESS_TOKEN);
  });
});
