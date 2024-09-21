import { Module } from '@nestjs/common';
import { WaletService } from './walet.service';
import { WaletController } from './walet.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Walet } from './entities/walet.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([Walet,User]),AuthModule],
  controllers: [WaletController],
  providers: [WaletService],
})
export class WaletModule {}
