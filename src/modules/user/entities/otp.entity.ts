import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Otp")
export class OtpEntity {
  @PrimaryGeneratedColumn("increment")
  id:number;
  @Column()
  code:string;
  @Column()
  expires_in:Date;
  @Column()
  userId:number;
  @OneToOne( ()=>User,(user)=>user.otp,{onDelete:"CASCADE"})
  user:User

}
