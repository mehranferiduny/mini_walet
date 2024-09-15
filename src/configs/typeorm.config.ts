import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { join } from "path";


export function typeOrmConfig ():TypeOrmModuleOptions{
  config({path:join(process.cwd(),".env")})
  const {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USERNAME}=process.env
  console.log(DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USERNAME)
  return{
    type:"postgres",
    host:DB_HOST,
    port:DB_PORT,
    username:DB_USERNAME,
    password:DB_PASSWORD,
    database:DB_NAME,
    autoLoadEntities:false,
    synchronize:true,
    entities: [
      "dist/**/**/**/*.entity{.ts,.js}",
      "dist/**/**/*.entity{.ts,.js}"
  ],
  }
}