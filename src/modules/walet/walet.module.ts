import { Module } from '@nestjs/common';
import { WaletService } from './walet.service';
import { WaletController } from './walet.controller';

@Module({
  controllers: [WaletController],
  providers: [WaletService],
})
export class WaletModule {}
