import { AccountLoginRequest, AccountLoginResponse, AccountLoginTopic, AccountRegisterRequest, AccountRegisterResponse, AccountRegisterTopic } from '@finlab/contracts';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) { }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User email',
    type: AccountRegisterResponse
  })
  async register(@Body() dto: AccountRegisterRequest): Promise<AccountRegisterResponse | undefined> {
    try {
      return await this.rmqService.send<AccountRegisterRequest, AccountRegisterResponse>(AccountRegisterTopic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Access token',
    type: AccountLoginResponse
  })
  async login(@Body() dto: AccountLoginRequest): Promise<AccountLoginResponse | undefined> {
    try {
      return await this.rmqService.send<AccountLoginRequest, AccountLoginResponse>(AccountLoginTopic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
