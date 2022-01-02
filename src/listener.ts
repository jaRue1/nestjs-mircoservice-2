import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://aivvmtwd:0Bc-LGbx7mHZP7os4ydYeIpE49Pz_n86@tiger.rmq.cloudamqp.com/aivvmtwd'],
        queue: 'admin_queue_2',
        queueOptions: {
          durable: false
        },
      },
    });

    app.listen();

}
bootstrap();
