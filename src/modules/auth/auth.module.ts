import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User,OtpEntity])],
  controllers: [AuthController],
  providers: [AuthService,JwtService],
  exports:[AuthService,TypeOrmModule]
})
export class AuthModule {}
