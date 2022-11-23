import { AccountLogin, AccountRegister } from '@finlab/contracts';
import { IUser, UserRole } from '@finlab/interfaces';
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

  async register({ email, password, displayName }: AccountRegister.Request): Promise<AccountRegister.Response> {
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

  async validateUser({ email, password }: AccountLogin.Request): Promise<Pick<IUser, '_id'>> {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Wrong login or password');
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error('Wrong login or password');
    }

    return { _id: user._id };
  }

  async login(id: string): Promise<AccountLogin.Response> {
    return {
      access_token: await this.jwtService.signAsync({ id })
    };
  }
}
