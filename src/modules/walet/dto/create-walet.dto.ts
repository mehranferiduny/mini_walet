import { IsNumber, IsString } from "class-validator";

export class DepositWaletDto {

  @IsNumber()
  amount:number

}
