import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { checkOtpDto, CreateAuthDto, sendOtpAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
import { TokenPalod } from './types/TokenPalod.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>,
    private readonly jwtServis:JwtService
  ){}

  async sendOtp(sendOtp:sendOtpAuthDto){
    const {phone}=sendOtp
    let user=await this.userRepository.findOneBy({phone})
    let otp:OtpEntity;
    if(!user){
      user=this.userRepository.create({phone})
      await this.userRepository.save(user)

    }
   const code= await this.createOtpUser(user)
   return {
    phone:phone,
    code:code
  
   }
  }

  async checkOtp(checkOtp:checkOtpDto){
    const{code,phone}=checkOtp
    const user=await this.userRepository.findOne({
      where:{phone},
    relations:{
      otp:true
    }})
    if(!user || !user?.otp) throw new NotFoundException("user not found!")
    const now=new Date()
   const otp=user?.otp
     if(otp?.code !== code) throw new BadRequestException("phone or code in valid")
      if(otp?.expires_in < now) throw new BadRequestException("code is expires tryAgin")
        
     if(!user?.phone_verify){
      await this.userRepository.update({id:user.id},{
        phone_verify:true
      })
     }   
        const acssesToken=this.makeToken({phone:user.phone,id:user.id})

     return{
      phone:user.phone,
      token:acssesToken
     }
      


  }


  makeToken(paylod:TokenPalod){
       return this.jwtServis.sign(paylod,{
        secret:process.env.JWT_SECRET,
        expiresIn:'30d'
       })
  }
 

  async createOtpUser(user:User){
    const code =randomInt(10000,99999).toString();
    const ExpiresIn=new Date(new Date().getTime() +1000 *60 *2);

    let otp=await this.otpRepository.findOneBy({userId:user.id})
     if(otp){
      if(otp.expires_in > new Date()){
        throw new BadRequestException("code is not expierd")
      }
      otp.code=code;
      otp.expires_in=ExpiresIn
     }else{
      otp= this.otpRepository.create({code:code,expires_in:ExpiresIn,userId:user.id})
     }
     await this.otpRepository.save(otp)
     user.otpId=otp.id
     await this.userRepository.save(user)
     return otp.code
  }


  async validateAcsesToken(token:string){
    try {
      const paylod=this.jwtServis.verify<TokenPalod>(token,{
        secret:process.env.JWT_SECRET,
      })
      if(typeof paylod=="object" && paylod?.id){
          const user=await this.userRepository.findOneBy({id:paylod.id})
          if(!user) throw new UnauthorizedException("login on Accont")
            return user
      }
      throw new UnauthorizedException("login on Accont")
    } catch (error) {
      throw new UnauthorizedException("login on Accont")
    }
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
