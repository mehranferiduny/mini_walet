import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({scope:Scope.REQUEST})
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @Inject(REQUEST) private readonly req:Request
  ){}


  async findOne() {
    const userId=this.req.user?.id
    const user= await this.userRepository.findOneBy({id:userId})
    return user

  }


}
