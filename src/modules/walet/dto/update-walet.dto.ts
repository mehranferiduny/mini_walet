import { PartialType } from '@nestjs/mapped-types';
import { DepositWaletDto } from './create-walet.dto';

export class UpdateWaletDto extends PartialType(DepositWaletDto) {}
