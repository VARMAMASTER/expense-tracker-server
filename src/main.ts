import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with a single line configuration
  app.enableCors({ origin: '*' });

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9000);
}
bootstrap();
