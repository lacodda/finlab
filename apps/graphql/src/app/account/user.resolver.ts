import { User as UserModel, UserJwtPayload } from '@finlab/contracts';
import { IJwtPayload } from '@finlab/interfaces';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { User } from '../guards/user.decorator';

@Resolver(() => UserModel)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  @Query(() => UserJwtPayload)
  async userInfo(@User() user: IJwtPayload): Promise<IJwtPayload | undefined> {
    try {
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
