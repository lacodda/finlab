import { AccountLogin, AccountRegister } from '@finlab/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { _id } = await this.authService.validateUser(dto);
    // eslint-disable-next-line @typescript-eslint/return-await
    return this.authService.login(_id);
  }
}
