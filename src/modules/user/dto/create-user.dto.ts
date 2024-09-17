import { IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3,18)
  @IsOptional()
  fullname:string;

  @IsMobilePhone('fa-IR',{},{message:"phone number invalid!"})
  @IsNotEmpty()
  phone:string
}
