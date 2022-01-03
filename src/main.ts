import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.setGlobalPrefix('api') // set a global prefix so that all endpoints follow http://localhost:8001/api/*
  app.enableCors({
    origin: 'http//:localhost:8080',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
  }) // vue front end 
  await app.listen(8001);

}
bootstrap();
