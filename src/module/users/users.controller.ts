import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from "@nestjs/common/decorators";
import { UsersService } from "./users.service";
import { Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GeneratePdf } from "../../data/utilities/report";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiFoundResponse, ApiTags } from "@nestjs/swagger";
import { UserDto, UserSearchDto } from "../../data/dto/dto";



@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post()
  @ApiBody({
    type:UserDto
  })
  @ApiCreatedResponse()
  async insert(@Body() data: any) {
    return this.userService.post(data);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  async fetchAll() {
    const users = await this.userService.fetch();
    return users;
  }

  @Get("pdf")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  pdf(@Request() req) {
    const user = req.user;
    GeneratePdf.generateReport({
      first_name: user.first_name,
      _id:user._id,
      email:user.email,
      phone:user.phone,
      username:user.username
    });

  }


  @Get("blake")
  balke() {
    return this.userService.blake2();
  }

  @Post("search")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  @ApiBody({
    type:UserSearchDto
  })
  @ApiFoundResponse()
  async search(@Body() data: any) {
    return this.userService.search(data);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    type: UserDto
  })
  async updateUser(@Param("id") id: string, @Body() data: any) {
    await this.userService.update(id, data);
    return "Updated";
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  async removeUser(@Param("id")uId: string) {

    await this.userService.delete(uId);
    return "Deleted";
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  async getOne(@Param("id")uId: string) {
    return this.userService.fetch(uId);

  }


}
