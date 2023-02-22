import { type IJwtPayload } from '@finlab/interfaces';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): IJwtPayload => {
  return ctx.switchToHttp().getRequest()?.user;
});

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  return ctx.switchToHttp().getRequest()?.user?.id;
});
