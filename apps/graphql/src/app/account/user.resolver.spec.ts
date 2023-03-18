import { type IJwtPayload } from '@finlab/interfaces';
import { Test, type TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

const USER: IJwtPayload = {
  id: '123456',
  email: 'admin@email.com',
  displayName: 'User'
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver
      ]
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to get information about the user', async () => {
    const userInfo = await resolver.userInfo(USER);
    expect(userInfo).toEqual(USER);
  });
});
