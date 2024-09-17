import { IsMobilePhone, IsString, Length } from "class-validator";

export class CreateAuthDto {}
export class sendOtpAuthDto {
  @IsMobilePhone("fa-IR",{},{message:"phone number is valid!"})
  phone:string
}
export class checkOtpDto {
  @IsMobilePhone("fa-IR",{},{message:"phone number is valid!"})
  phone:string
  @IsString()
  @Length(5,5)
  code:string
}
