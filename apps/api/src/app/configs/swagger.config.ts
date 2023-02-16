import { DocumentBuilder, type OpenAPIObject } from '@nestjs/swagger';

export const getSwaggerConfig = (): Omit<OpenAPIObject, 'paths'> => new DocumentBuilder()
  .setTitle('finlab')
  .setDescription('finlab REST API')
  .setVersion('1.0')
  .build();
