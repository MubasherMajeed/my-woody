import { BadRequestException, Get, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment, AppointmentDocument, AppointmentStatus } from "../../data/schemas/appointment.schema";
import { Model } from "mongoose";
import { UsersService } from "../users/users.service";
import mongoose from "mongoose";
import { User } from "../../data/schemas/user.schema";
import { equal } from "assert";
import { SendEmail } from "../../data/utilities/emailmodule";

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

  delete(id?: string) {
    return this.model.findByIdAndDelete(id);
  }


  async post(data:any) {
    const vehicle = new this.model({
      aType:data.aType,
      serviceType:data.serviceType,
      description:data.description,
      date:data.date,
     timeFrom: data.timeFrom,
      timeTo:data.timeTo,
      addressLine1:data.addressLine1,
      addressLine2:data.addressLine2,
      city:data.city,
      state:data.state,
      zipCode:data.zipCode,
      status:data.status,
      uid:data.uid,
    });
    return  await vehicle.save();
  }

  async update(id: string, data:any) {
    return await this.model.findByIdAndUpdate(id, {
      aType:data.aType,
      serviceType:data.serviceType,
      description:data.description,
      date:data.date,
      timeFrom: data.timeFrom,
      timeTo:data.timeTo,
      addressLine1:data.addressLine1,
      addressLine2:data.addressLine2,
      city:data.city,
      state:data.state,
      zipCode:data.zipCode,
      status:data.status,
      uid:data.uid

    }).exec();
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
    return this.model.find({
      status:status
    }).exec();
  }

  async UpdateStatus(id:string,data:any){
    let appointment;
    try {
       appointment=await this.model.findByIdAndUpdate(id,{status:data.status});
    }catch (e){
        throw new BadRequestException();
    }


     // console.log(appointment.uid);



    const user = await this.userService.fetch(appointment.uid) as User;
      console.log(user);
    await SendEmail.sendemail(user.email, user.first_name, status.toString())



  }


}
