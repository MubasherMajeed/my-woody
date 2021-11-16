import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post()
  async insert(
    @Body() data: any
  ) {
    return this.userService.post(
      data.fName,
      data.lName,
      data.email,
      data.password,
      data.phone,
      data.userName
    );
  }

  @Get()
  async fetchAll() {
    const users = await this.userService.fetch();
    return users;
  }


  @Patch(":id")
  async updateUser(
    @Param("id") id :string,
    @Body() data:any,
    ){
    await this.userService.update(id,data.fName,data.lName,data.email,data.password,data.phone,data.userName);
    return "Updated";

  }

  @Delete(":id")
  async removeUser(
    @Param('id')uId:string
  ){

    await this.userService.delete(uId);
    return "Deleted";
  }

  @Get(":id")
 async getOne(@Param("id")uId:string){
   return this.userService.fetch(uId);

  }


}
