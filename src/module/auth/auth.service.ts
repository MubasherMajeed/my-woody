import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {

  constructor(private readonly userService:UsersService) {
  }

  async validateUser(username:string,pass:string):Promise<any>{
    const user= await this.userService.findByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}