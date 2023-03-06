import { type CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, type ValueNode } from 'graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<Date | string, Date | null> {
  description = 'Date custom scalar type';

  // value from the client
  parseValue(value: unknown): Date {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    return new Date();
  }

  // value sent to the client
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value as string;
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
