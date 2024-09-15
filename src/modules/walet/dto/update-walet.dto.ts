import { PartialType } from '@nestjs/mapped-types';
import { CreateWaletDto } from './create-walet.dto';

export class UpdateWaletDto extends PartialType(CreateWaletDto) {}
