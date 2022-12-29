import { AccountLogin, AccountRegister } from '@finlab/contracts';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) { }

  @Post('register')
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response | undefined> {
    try {
      return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: AccountLogin.Response
  })
  async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response | undefined> {
    try {
      return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
