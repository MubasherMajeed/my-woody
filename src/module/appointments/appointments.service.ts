import { BadRequestException, Get, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment, AppointmentDocument, AppointmentStatus } from "../../data/schemas/appointment.schema";
import { Model } from "mongoose";
import { UsersService } from "../users/users.service";
import mongoose from "mongoose";
import { User } from "../../data/schemas/user.schema";
import { equal } from "assert";
import { SendEmail } from "../../data/utilities/emailmodule";
import { GeneratePdf } from "../../data/utilities/report";

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name )private readonly model:Model<AppointmentDocument>,
              private readonly userService: UsersService,
              ) {
  }


  fetch(id?: string) {
    if (id) {
      return this.model.findById(id);
    }
    const items=  this.model.find().populate('uid').exec();
     return items;
    // for (let item in items){
    //   item[id].uid = this.userService.fetch();
    // }

  }
  fetchPages(data:any){
     return  this.model.find( ).skip(data.limit*(data.page_number-1)).limit(data.limit).exec();
  }

  delete(id?: string) {
    return this.model.findByIdAndDelete(id);
  }


  async post(data:any) {
    const appointment = await this.model.create(data);
    return  await appointment.save();
  }

  async update(id: string, data:any) {
    return await this.model.findByIdAndUpdate(id, data).exec();
  }

   async fetchByUserId(id:string){
    return this.model.find({
      uid:id
    }).exec();
  }

  async fetchByService(serviceType:number){
    return this.model.find({
      serviceType:serviceType
    }).exec();
  }
async fetchByAppointmentType(aType:number){
    return this.model.find({
      aType:aType
    }).exec();
  }

  async checkSatus(status:number){
    return (await this.model.find({
      status: status
    }).exec()).length;
  }

  async UpdateStatus(id:string,data:any){
    let appointment;
    try {
       appointment=await this.model.findByIdAndUpdate(id,data);
    }catch (e){
        throw new BadRequestException();
    }
    const user = await this.userService.fetch(appointment.uid) as User;
    await SendEmail.sendemail(user.email, user.first_name, data.status.toString());
    return "Updated";
  }

  async pdf(id: string) {

    const appointments=await this.model.find({uid:id}).populate('uid');
    return await GeneratePdf.generateReport(appointments);

  }


}
