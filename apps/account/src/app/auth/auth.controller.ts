import { IUser } from '@finlab/interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export class RegisterDto {
  email: string;
  password: string;
  displayName?: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<Pick<IUser, 'email'>> {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: RegisterDto): Promise<{ access_token: string }> {
    const { _id } = await this.authService.validateUser(dto);
    // eslint-disable-next-line @typescript-eslint/return-await
    return this.authService.login(_id);
  }
}
