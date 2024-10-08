import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { WaletModule } from './modules/walet/walet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, WaletModule,TypeOrmModule.forRoot(typeOrmConfig()), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
