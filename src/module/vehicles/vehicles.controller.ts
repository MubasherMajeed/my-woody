import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {
  }

  @Post()
  async insert(
    @Body() data: any
  ) {
    return this.vehiclesService.post(
      data.year,
      data.make,
      data.model,
      data.vin,
      data.uid,
    );
  }

  @Get()
  async fetchAll() {
    const vehicle = await this.vehiclesService.fetch();
    return vehicle;
  }


  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() data: any
  ) {
    await this.vehiclesService.update(id, data.year,
      data.make,
      data.model,
      data.vin,
      data.uid);
    return "Updated";

  }

  @Delete(":id")
  async removeUser(
    @Param("id")vId: string
  ) {

    await this.vehiclesService.delete(vId);
    return "Deleted";
  }

  @Get(":id")
  async getOne(@Param("id")vId: string) {
    return this.vehiclesService.fetch(vId);

  }


}

