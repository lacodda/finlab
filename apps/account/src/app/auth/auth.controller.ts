import { AccountLoginRequest, type AccountLoginResponse, AccountLoginTopic, AccountRegisterRequest, type AccountRegisterResponse, AccountRegisterTopic } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountRegisterTopic)
  async register(@Body() dto: AccountRegisterRequest): Promise<AccountRegisterResponse> {
    return await this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLoginTopic)
  async login(@Body() dto: AccountLoginRequest): Promise<AccountLoginResponse> {
    const jwtPayload = await this.authService.validateUser(dto);
    // eslint-disable-next-line @typescript-eslint/return-await
    return this.authService.login(jwtPayload);
  }
}
