import { type AccountRegisterRequest, type AccountRegisterResponse, type AccountLoginRequest, type AccountLoginResponse } from '@finlab/contracts';
import { type IJwtPayload, UserRole } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, displayName }: AccountRegisterRequest): Promise<AccountRegisterResponse> {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) {
      throw new Error('This user is already registered');
    }
    const newUserEntity = await new UserEntity({
      displayName,
      email,
      passwordHash: '',
      role: UserRole.User
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);

    return { email: newUser.email };
  }

  async validateUser({ email, password }: AccountLoginRequest): Promise<IJwtPayload> {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Wrong login or password');
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error('Wrong login or password');
    }

    return { id: user._id as string, email: user.email, displayName: user.displayName };
  }

  async login(jwtPayload: IJwtPayload): Promise<AccountLoginResponse> {
    return {
      access_token: await this.jwtService.signAsync(jwtPayload)
    };
  }
}
