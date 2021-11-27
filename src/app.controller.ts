import { Controller, Get, Request, Post, UseGuards,Param, Body } from "@nestjs/common";
import { SendEmail } from "./data/utilities/emailmodule";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./data/utilities/auth/auth.service";
import { JwtAuthGuard } from "./data/utilities/auth/jwt-auth.guard";
import { GeneratePdf } from "./data/utilities/report";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { emailDto, LoginDto } from "./data/dto/dto";


@ApiTags("Login")
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}




  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({
    type:LoginDto
  })
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }

  @Post("email")
  @ApiBody({
    type: emailDto
  })
   async sendMail(@Body()data:any){
    // const user= await this.usersService.fetch(data._id);
      await SendEmail.sendemail(data.email,data.first_name ,data.status);
    //console.log(user);


  }





}
