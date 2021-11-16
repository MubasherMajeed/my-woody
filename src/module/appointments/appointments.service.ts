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


  async post(aType: number, serviceType: number, desc: string,
             date: Date,  timeFrom: string, timeTo: string,
             addressLine1: string,
             addressLine2: string,
             city: string,
             state: string,
             zipCode: number,
             status: number,
             uid: string) {
    const vehicle = new this.model({
      aType:aType,
      serviceType:serviceType,
      description:desc,
      date:date,
      timeFrom:timeFrom,
      timeTo:timeTo,
      addressLine1:addressLine1,
      addressLine2:addressLine2,
      city:city,
      state:state,
      zipCode:zipCode,
      status:status,
      uid:uid
    });
    return  await vehicle.save();
  }

  async update(id: string, aType: number, serviceType: number, desc: string,
               date: Date,  timeFrom: string, timeTo: string,
               addressLine1: string,
               addressLine2: string,
               city: string,
               state: string,
               zipCode: number,
               status: number,
               uid: string) {
    return await this.model.findByIdAndUpdate(id, {
      aType:aType, serviceType:serviceType, description:desc,
      date:date,
      timeFrom:timeFrom,
      timeTo:timeTo,
      addressLine1:addressLine1,
      addressLine2:addressLine2,
      city:city,
      state:state,
      zipCode:zipCode,
      status:zipCode,
      uid:uid

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

  async UpdateStatus(id:string,status:number){
    let appointment;
    try {
       appointment=await this.model.findByIdAndUpdate(id,{status:status});
    }catch (e){
        throw new BadRequestException();
    }


     // console.log(appointment.uid);



    const user = await this.userService.fetch(appointment.uid) as User;
      console.log(user);
    await SendEmail.sendemail(user.email, user.fName, status.toString())



  }


}
