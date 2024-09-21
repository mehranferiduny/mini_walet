import { BadRequestException, HttpException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DepositWaletDto, PrudectIdDto } from './dto/create-walet.dto';
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
import { ProductList } from '../product';

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
  
   const hashPass=generate({length:24,numbers:true})
    const queryRuner= this.dataSorce.createQueryRunner()
    await queryRuner.connect()
    await queryRuner.startTransaction()
    try {

    const user= await queryRuner.manager.findOneBy(User,{id:userData.id})

    const newBaluns=+(user.balance) + amount
  
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
      message:"payment sucsessfully"
    }


  }

  async paymentByProduct(productId:PrudectIdDto){
    const product=ProductList.find(pro=>pro.id === productId.productId)
    if(!product) throw new NotFoundException("NotFound Product!")
      const userData:User=this.req.user
    const hashPass=generate({length:24,numbers:true})
    const queryRuner= this.dataSorce.createQueryRunner()
    await queryRuner.connect()
    await queryRuner.startTransaction()

    try {

      const user=await queryRuner.manager.findOneBy(User,{id:userData.id})
      if(!user) throw new BadRequestException('user Not Found')
        if(product.price>user.balance){
          throw new BadRequestException("user balanec not enough")
        }
       const newBalance=+(user.balance)-product.price
       await queryRuner.manager.update(User,{id:user.id},{balance:newBalance}) 
       await queryRuner.manager.insert(Walet,{
        amount:product.price,
        invoice_number:hashPass,
        type:WalltType.Withdraw,
        userId:user.id,
        prodectId:product.id,
        reason:'pyment by product'+product.name
       })
      
      
    //! Commit
    await queryRuner.commitTransaction()
    await queryRuner.release()

    return{
      message:"payment product sucsessfully"
    }
      
    } catch (error) {
      //! RollBack
      await queryRuner.rollbackTransaction()
      await queryRuner.release()

      if(error?.statusCode){
        throw new HttpException(error?.message,error?.statusCode)
      }
      throw new BadRequestException(error?.message)
    }

  }
   
  async GetTransactionWalet(){
    return this.walletRepository.find()
  }
}
