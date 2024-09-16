import { Walet } from "src/modules/walet/entities/walet.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id:number;
  @Column()
  full_name:string;
  @Column()
  phone:string;
  @Column({type:'numeric',default:0})
  balance:number
  @CreateDateColumn()
  created_at:Date

  @OneToMany(()=>Walet,walet=>walet.user)
  transaction:Walet

}
