import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";
import { User } from "./user.schema";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type AppointmentDocument = Appointment & Document;

export enum AppointmentStatus {
  Pending,
  Approved,
  Rejected,
  Cancelled,
  Completed
}



@Schema({timestamps:true})
export class Appointment{
  @Prop()
  aType:number;
  @Prop()
  serviceType:number;
  @Prop()
  description:string;
  @Prop()
  date:Date;
  @Prop()
  timeFrom:string;
  @Prop()
  timeTo:string;
  @Prop()
  addressLine1:string;
  @Prop()
  addressLine2:string;
  @Prop()
  city:string;
  @Prop()
  state:string;
  @Prop()
  zipCode:number;
  @Prop()
  status:number;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref:User.name})
  uid: string;
}

export const AppointmentSchema=SchemaFactory.createForClass(Appointment);
