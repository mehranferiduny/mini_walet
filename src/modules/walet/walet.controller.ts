import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaletService } from './walet.service';
import { CreateWaletDto } from './dto/create-walet.dto';
import { UpdateWaletDto } from './dto/update-walet.dto';

@Controller('walet')
export class WaletController {
  constructor(private readonly waletService: WaletService) {}

  @Post()
  create(@Body() createWaletDto: CreateWaletDto) {
    return this.waletService.create(createWaletDto);
  }

  @Get()
  findAll() {
    return this.waletService.findAll();
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
