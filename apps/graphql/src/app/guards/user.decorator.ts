import { type IJwtPayload } from '@finlab/interfaces';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator((data: unknown, context: ExecutionContext): IJwtPayload => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req?.user;
});

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext): string => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req?.user?.id;
});
