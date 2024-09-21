import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WaletService } from './walet.service';
import {  DepositWaletDto, PrudectIdDto } from './dto/create-walet.dto';
import { UpdateWaletDto } from './dto/update-walet.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('walet')
@UseGuards(AuthGuard)
export class WaletController {
  constructor(private readonly waletService: WaletService) {}

  @Post('deposit')
  deposit(@Body() depositDto:DepositWaletDto){
    return this.waletService.deposit(depositDto)
  }
  @Post('withdraw')
  withdraw(@Body() productId:PrudectIdDto){

    return this.waletService.paymentByProduct(productId)
  }

  @Get()
  walet(){
    return this.waletService.GetTransactionWalet()
  }
}
