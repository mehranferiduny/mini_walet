import { Walet } from "src/modules/walet/entities/walet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id:number;
  @Column({nullable:true})
  full_name:string;
  @Column()
  phone:string;
  @Column({default:false})
  phone_verify:boolean;
  @Column({type:'numeric',default:0})
  balance:number
  @CreateDateColumn()
  created_at:Date

  @OneToMany(()=>Walet,walet=>walet.user)
  transaction:Walet

  @Column({nullable:true})
  otpId:number;
  @OneToOne( ()=>OtpEntity,(otp)=>otp.user)
  @JoinColumn({name:"otpId"})
  otp:OtpEntity

}
