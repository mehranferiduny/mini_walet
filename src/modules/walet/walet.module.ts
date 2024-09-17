import { Module } from '@nestjs/common';
import { WaletService } from './walet.service';
import { WaletController } from './walet.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [WaletController],
  providers: [WaletService],
})
export class WaletModule {}
