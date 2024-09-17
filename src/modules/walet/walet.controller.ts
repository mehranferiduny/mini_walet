import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WaletService } from './walet.service';
import { CreateWaletDto } from './dto/create-walet.dto';
import { UpdateWaletDto } from './dto/update-walet.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('walet')
@UseGuards(AuthGuard)
export class WaletController {
  constructor(private readonly waletService: WaletService) {}

  @Post()
  create(@Body() createWaletDto: CreateWaletDto) {
    return this.waletService.create(createWaletDto);
  }

  @Get('hii')
  findAll() {
    return "hello";
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaletDto: UpdateWaletDto) {
    return this.waletService.update(+id, updateWaletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waletService.remove(+id);
  }
}
