import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

dotenv.config(); // load vars from .env 

async function bootstrap() {
  console.log('Starting application...');

  // create a new instance of the application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // cerve static files from the 'uploads' directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  console.log('Static assets will be served from:', join(__dirname, '..', 'uploads'));

  // enable CORS
  app.enableCors();
  console.log('CORS is enabled');

  
  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}

bootstrap();
