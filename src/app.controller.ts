import { Controller, Get, Request, Post, UseGuards, Param, Body } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { SendEmail } from "./data/utilities/emailmodule";
import { UsersService } from "./module/users/users.service";

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}



  @UseGuards(AuthGuard('local'))
  @Post('auth')
  async login(@Request() req) {
    console.log(req.user)
    return req.user;
  }

  @Post("email")
   async sendMail(@Body()data:any){
   console.log(data.email);
    // const user= await this.usersService.fetch(data._id);
      await SendEmail.sendemail(data.email,data.fName ,data.status);
    //console.log(user);


  }





}
