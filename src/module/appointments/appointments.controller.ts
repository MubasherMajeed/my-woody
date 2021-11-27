import {
  Body,
  Controller,
  Request,
  Delete,
  Get,
  Param,
  Response,
  Patch,
  Post,
  UseGuards,
  Res,
  Header,
  HttpException,
  HttpStatus, StreamableFile
} from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import {  AppointmentStatus } from "../../data/schemas/appointment.schema";
import { SendEmail } from "../../data/utilities/emailmodule";
import { UsersService } from "../users/users.service";
import { User } from "../../data/schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../../data/utilities/auth/jwt-auth.guard";
import { compareSync } from "bcrypt";
import { createReadStream } from "fs";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Dto, AppointmentStatusDto } from "../../data/dto/dto";

@ApiTags("Appointments")
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService:AppointmentsService,
              private readonly user:UsersService

              ) {
  }


  @Post("pages")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  getPages(@Body() data:any){
    return this.appointmentService.fetchPages(data)
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  @ApiBody({
    type: Dto,
    description: "Enter To Create Appointment"
  })
  @ApiResponse({
    status: 500,
    description: "internal server erre"
  })
  async insert( @Body() data: any ) {
    return this.appointmentService.post(data
    );
  }

  @Get("pdf/:id")
  async pdf(@Param( 'id') id:string,@Res() res){
    (await this.appointmentService.pdf(id)).pipe(res)

    // const file=createReadStream('result.pdf');
    // res.set({
    //   'Content-Type': 'application/pdf',
    //   'Content-Disposition': 'attachment; filename=result.pdf',
    // });
    // return new StreamableFile();
  }


  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async fetchAll(@Request() req) {
      console.log(req.user);
    if (req.user.role ===1){

      const appointments = await this.appointmentService.fetch();
      return appointments;
    }
    throw new HttpException("No Access To this Route",HttpStatus.BAD_REQUEST);

  }


  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  @ApiBody({
    type:Dto,
    description:"Update Appointment"
  })
  async updateUser(
    @Param("id") id: string,
    @Body() data: any
  ) {
    await this.appointmentService.update(id, data);
    return "Updated";

  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async removeUser(
    @Param("id")aId: string
  ) {

    await this.appointmentService.delete(aId);
    return "Deleted";
  }

  @Get(":id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async getOne(@Param("id")aId: string) {
    return this.appointmentService.fetch(aId);

  }

  @Get("user/:id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async getByUserId(@Param("id")uid: string) {
    return this.appointmentService.fetchByUserId(uid);

  }

  @Get("service/:id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async getByServiceType(@Param("id")serviceType: number) {
    return this.appointmentService.fetchByService(serviceType);

  }

  @Get("type/:id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async getByAppointmentType(@Param("id")aType: number) {
    return this.appointmentService.fetchByAppointmentType(aType);
  }

  @Get("status/:id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  async checkStatus(@Param("id")status: number) {
    return this.appointmentService.checkSatus(status);
  }

  @Patch("updatestatus/:id")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("access-token")
  @ApiBody({
    type: AppointmentStatusDto

  })
  async updateStatus(@Param("id") id:string, @Body()data:any){

    if (data.status===AppointmentStatus.Rejected||data.status===AppointmentStatus.Pending||
      data.status===AppointmentStatus.Approved||
      data.status===AppointmentStatus.Completed||data.status===AppointmentStatus.Cancelled){
      return  await this.appointmentService.UpdateStatus(id, data);
    }
    return "Not Accepted";
  }


}
