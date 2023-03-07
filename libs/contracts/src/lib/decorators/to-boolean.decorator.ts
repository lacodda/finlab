import { Transform } from 'class-transformer';

export default function ToBoolean(): PropertyDecorator {
  return Transform(({ value }: { value: string | boolean }) => {
    return [true, 'true'].includes(value);
  });
}
