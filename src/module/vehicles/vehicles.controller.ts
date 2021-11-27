import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { VehicleDto } from "../../data/dto/dto";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse()
  @ApiBody({
    type:VehicleDto
  })
  async insert(@Body() data: any) {
    return this.vehiclesService.post(
      data
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async fetchAll() {
    const vehicle = await this.vehiclesService.fetch();
    return vehicle;
  }

  @Patch(":id")
  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    type:VehicleDto
  })
  async updateUser(
    @Param("id") id: string,
    @Body() data: any
  ) {
    await this.vehiclesService.update(id, data);
    return "Updated";

  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async removeUser(
    @Param("id")vId: string
  ) {

    await this.vehiclesService.delete(vId);
    return "Deleted";
  }

  @Get(":id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async getOne(@Param("id")vId: string) {
    return this.vehiclesService.fetch(vId);
  }

}
