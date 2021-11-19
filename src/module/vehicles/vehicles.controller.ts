import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async insert(@Body() data: any) {
    return this.vehiclesService.post(
      data
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fetchAll() {
    const vehicle = await this.vehiclesService.fetch();
    return vehicle;
  }


  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param("id") id: string,
    @Body() data: any
  ) {
    await this.vehiclesService.update(id, data);
    return "Updated";

  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  async removeUser(
    @Param("id")vId: string
  ) {

    await this.vehiclesService.delete(vId);
    return "Deleted";
  }

  @Get(":id")
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param("id")vId: string) {
    return this.vehiclesService.fetch(vId);
  }

}
