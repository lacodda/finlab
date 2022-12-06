import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async info(@UserId() userId: string): Promise<void> {
    console.log(userId);
  }

  @Cron('*/5 * * * * *')
  cron(): void {
    Logger.log('Done');
  }
}
