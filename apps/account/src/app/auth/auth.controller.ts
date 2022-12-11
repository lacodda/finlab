import { AccountLogin, AccountRegister } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return await this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { _id } = await this.authService.validateUser(dto);
    // eslint-disable-next-line @typescript-eslint/return-await
    return this.authService.login(_id as string);
  }
}
