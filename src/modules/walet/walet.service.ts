import { Inject, Injectable, Scope } from '@nestjs/common';
import { DepositWaletDto } from './dto/create-walet.dto';
import { UpdateWaletDto } from './dto/update-walet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Walet } from './entities/walet.entity';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Request, request } from 'express';
import { User } from '../user/entities/user.entity';
import { WalltType } from './walet.enum';

import { REQUEST } from '@nestjs/core';
import { generate } from 'generate-password';

@Injectable({scope:Scope.REQUEST})
export class WaletService {

  constructor(
    @InjectRepository(Walet) private readonly walletRepository:Repository<Walet>,
     @Inject(REQUEST) private readonly req:Request,
     private readonly dataSorce:DataSource

  ){}


  async deposit(depositDto:DepositWaletDto){
    const {amount}=depositDto
    const userData:User= this.req.user
    console.log(userData)
   const hashPass=generate({length:24,numbers:true})
    const queryRuner= this.dataSorce.createQueryRunner()
    await queryRuner.connect()
    await queryRuner.startTransaction()
    try {

    const user= await queryRuner.manager.findOneBy(User,{id:userData.id})
   console.log(typeof user.balance)
   console.log(typeof amount)
    const newBaluns=+(user.balance) + amount
    console.log(typeof newBaluns)
    await queryRuner.manager.update(User,{id:user.id},{balance:newBaluns})
    await queryRuner.manager.insert(Walet,{
      type:WalltType.Deposit,
      amount,
      userId:user.id,
      invoice_number:hashPass

    })

    //! Commit
    await queryRuner.commitTransaction()
    await queryRuner.release()



    
      
    } catch (error) {
      console.log(error)

      //! RollBack
      await queryRuner.rollbackTransaction()
      await queryRuner.release()
    }

    return{
      message:"pyment sucsessfully"
    }


  }

}
