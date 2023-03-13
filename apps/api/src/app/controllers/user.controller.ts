import { UserJwtPayload } from '@finlab/contracts';
import { IJwtPayload } from '@finlab/interfaces';
import { Controller, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { User } from '../guards/user.decorator';

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiResponse({
    status: 200,
    description: 'User info',
    type: UserJwtPayload
  })
  async info(@User() user: IJwtPayload): Promise<IJwtPayload | undefined> {
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
    // Logger.log('Done');
  }
}
