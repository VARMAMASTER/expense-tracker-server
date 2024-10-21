import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API EncryptionService
  // const encryptionService = new CryptoService();
  // app.useGlobalInterceptors(new EncryptionInterceptor(encryptionService));

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
