import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { AppointmentStatus } from "../../data/schemas/appointment.schema";
import { SendEmail } from "../../data/utilities/emailmodule";
import { UsersService } from "../users/users.service";
import { User } from "../../data/schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService:AppointmentsService,
              private readonly user:UsersService

              ) {
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  async insert( @Body() data: any ) {
    return this.appointmentService.post(data
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fetchAll() {
    const appointments = await this.appointmentService.fetch();
    return appointments;
  }


  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param("id") id: string,
    @Body() data: any
  ) {
    await this.appointmentService.update(id, data);
    return "Updated";

  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  async removeUser(
    @Param("id")aId: string
  ) {

    await this.appointmentService.delete(aId);
    return "Deleted";
  }

  @Get(":id")
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param("id")aId: string) {
    return this.appointmentService.fetch(aId);

  }

  @Get("user/:id")
  @UseGuards(AuthGuard('jwt'))
  async getByUserId(@Param("id")uid: string) {
    return this.appointmentService.fetchByUserId(uid);

  }

  @Get("service/:id")
  @UseGuards(AuthGuard('jwt'))
  async getByServiceType(@Param("id")serviceType: number) {
    return this.appointmentService.fetchByService(serviceType);

  }

  @Get("type/:id")
  @UseGuards(AuthGuard('jwt'))
  async getByAppointmentType(@Param("id")aType: number) {
    return this.appointmentService.fetchByAppointmentType(aType);
  }

  @Get("status/:id")
  @UseGuards(AuthGuard('jwt'))
  async checkStatus(@Param("id")status: number) {
    return this.appointmentService.checkSatus(status);
  }

  @Patch("updatestatus/:id")
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(@Param("id") id:string,
                     @Body()data:any){

    if (data.status===AppointmentStatus.Rejected||data.status===AppointmentStatus.Pending||
      data.status===AppointmentStatus.Approved||
      data.status===AppointmentStatus.Completed||data.status===AppointmentStatus.Cancelled){
      return  await this.appointmentService.UpdateStatus(id, data);
    }
    return "Not Accepted";
  }


}
