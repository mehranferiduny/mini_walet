import { Injectable } from '@nestjs/common';
import { CreateWaletDto } from './dto/create-walet.dto';
import { UpdateWaletDto } from './dto/update-walet.dto';

@Injectable()
export class WaletService {
  create(createWaletDto: CreateWaletDto) {
    return 'This action adds a new walet';
  }

  findAll() {
    return `This action returns all walet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walet`;
  }

  update(id: number, updateWaletDto: UpdateWaletDto) {
    return `This action updates a #${id} walet`;
  }

  remove(id: number) {
    return `This action removes a #${id} walet`;
  }
}
