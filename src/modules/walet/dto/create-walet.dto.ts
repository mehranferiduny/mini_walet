import { IsNumber, IsString } from "class-validator";

export class DepositWaletDto {

  @IsNumber()
  amount:number

}


export class PrudectIdDto{
  @IsNumber()
  productId:number
}