import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from "@nestjs/common/decorators";
import { UsersService } from "./users.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post()
  async insert(@Body() data: any) {
    return this.userService.post(data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fetchAll() {
    const users = await this.userService.fetch();
    return users;
  }


  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param("id") id: string, @Body() data: any) {
    await this.userService.update(id, data);
    return "Updated";

  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  async removeUser(@Param("id")uId: string) {

    await this.userService.delete(uId);
    return "Deleted";
  }

  @Get(":id")
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param("id")uId: string) {
    return this.userService.fetch(uId);

  }


}
