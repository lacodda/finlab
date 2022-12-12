import { IJwtPayload } from '@finlab/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserPayload = createParamDecorator((data: unknown, ctx: ExecutionContext): IJwtPayload => {
  return ctx.switchToHttp().getRequest()?.user;
});
