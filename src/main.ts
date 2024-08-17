import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({ origin: '*' });

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Listen on the specified port and hostname
  await app.listen(process.env.PORT);
}

bootstrap();
