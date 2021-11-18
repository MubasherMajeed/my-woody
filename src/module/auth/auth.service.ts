import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { User } from "../../data/schemas/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(private readonly userService:UsersService,private jwtService:JwtService) {
  }

  async validateUser(username:string,pass:string):Promise<any>{
    const user= await this.userService.findByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:any){
    const payload={username:user.username,sub:user._id};
    return{
      access_token:this.jwtService.sign(payload),
    }
  }

}
