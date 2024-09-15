import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config({path:join(process.cwd(),".env")})
  const {PORT}=process.env
  console.log(PORT)
  await app.listen(PORT,()=>{
    console.log(`start project in port :${PORT} `)
  });
}
bootstrap();
