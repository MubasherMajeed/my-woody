import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "../../data/schemas/appointment.schema";
import { UsersModule } from "../users/users.module";

@Module({
  imports:[MongooseModule.forFeature([{name:Appointment.name,schema:AppointmentSchema}]), UsersModule],
  providers: [AppointmentsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
