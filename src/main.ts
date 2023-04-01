import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform:true,
      transformOptions: {
        enableImplicitConversion: true, // number나 boolean으로 자동 변환 가능
      },
      whitelist:true,
    }
  ));
  await app.listen(3000);
}
bootstrap();
