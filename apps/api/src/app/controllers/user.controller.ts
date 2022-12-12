import { IJwtPayload } from '@finlab/interfaces';
import { Controller, Logger, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserPayload } from '../guards/user.decorator';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('info')
  async info(@UserPayload() user: IJwtPayload): Promise<IJwtPayload | undefined> {
    try {
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Cron('* */1 * * *')
  cron(): void {
    Logger.log('Done');
  }
}
