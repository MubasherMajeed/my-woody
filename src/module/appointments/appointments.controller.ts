import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { AppointmentStatus } from "../../data/schemas/appointment.schema";
import { SendEmail } from "../../data/utilities/emailmodule";
import { UsersService } from "../users/users.service";
import { User } from "../../data/schemas/user.schema";

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService:AppointmentsService,
              private readonly user:UsersService

              ) {
  }


  @Post()
  async insert(
    @Body() data: any
  ) {
    return this.appointmentService.post(
      data.aType,
      data.serviceType,
      data.description,
      data.date,
      data.timeFrom,
      data.timeTo,
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.state,
      data.zipCode,
      data.status,
      data.uid,
    );
  }

  @Get()
  async fetchAll() {
    const appointments = await this.appointmentService.fetch();
    return appointments;
  }


  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() data: any
  ) {
    await this.appointmentService.update(id, data.aType,
      data.serviceType,
      data.description,
      data.date,
      data.timeFrom,
      data.timeTo,
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.state,
      data.zipCode,
      data.status,
      data.uid,);
    return "Updated";

  }

  @Delete(":id")
  async removeUser(
    @Param("id")aId: string
  ) {

    await this.appointmentService.delete(aId);
    return "Deleted";
  }

  @Get(":id")
  async getOne(@Param("id")aId: string) {
    return this.appointmentService.fetch(aId);

  }

  @Get("user/:id")
  async getByUserId(@Param("id")uid: string) {
    return this.appointmentService.fetchByUserId(uid);

  }

  @Get("service/:id")
  async getByServiceType(@Param("id")serviceType: number) {
    return this.appointmentService.fetchByService(serviceType);

  }

  @Get("type/:id")
  async getByAppointmentType(@Param("id")aType: number) {
    return this.appointmentService.fetchByAppointmentType(aType);
  }

  @Get("status/:id")
  async checkStatus(@Param("id")status: number) {
    return this.appointmentService.checkSatus(status);
  }

  @Patch("updatestatus/:id")
  async updateStatus(@Param("id") id:string,
                     @Body()data:any){

    if (data.status===AppointmentStatus.Approved){

       await this.appointmentService.UpdateStatus(id, data.status);


    }


  }


}
