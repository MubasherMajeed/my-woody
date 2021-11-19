import { Controller, Get, Request, Post, UseGuards, Param, Body } from "@nestjs/common";
import { SendEmail } from "./data/utilities/emailmodule";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./module/auth/auth.service";
import { JwtAuthGuard } from "./module/auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}



  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }

  @Post("email")
   async sendMail(@Body()data:any){
    // const user= await this.usersService.fetch(data._id);
      await SendEmail.sendemail(data.email,data.first_name ,data.status);
    //console.log(user);


  }





}
