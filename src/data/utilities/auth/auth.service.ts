import { Injectable } from '@nestjs/common';
import { UsersService } from "../../../module/users/users.service";
import { User } from "../../schemas/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(private readonly userService:UsersService,private jwtService:JwtService) {
  }

  async validateUser(username:string,pass:string):Promise<any>{
    const user= await this.userService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:any){
    const payload={username:user.username,sub:user._id,first_name:user.first_name,role:user.role,
      last_name:user.last_name,email:user.email,phone:user.phone};
    return{
      access_token:this.jwtService.sign(payload),
    }
  }

}
