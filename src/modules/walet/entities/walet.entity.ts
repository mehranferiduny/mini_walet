import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WalltType } from "../walet.enum";
import { User } from "src/modules/user/entities/user.entity";

@Entity('walet')
export class Walet {
  @PrimaryGeneratedColumn('increment')
  id:number
  @Column({type:'enum',enum:WalltType})
  type:string;
  @Column()
  invoice_number:string;
  @Column({type:'numeric'})
  amount:number;
  @CreateDateColumn()
  created_at:Date
  
  @Column()
  userId:number
  @ManyToOne(()=>User,user=>user.transaction,{onDelete:'SET NULL'})
  user:User
}
