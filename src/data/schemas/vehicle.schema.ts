import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { User } from "./user.schema";


export type VehicleDocument = mongoose.Document;

@Schema({timestamps:true })
export class Vehicle {
  @Prop()
  year:string;
  @Prop()
  make:string;
  @Prop()
  model:string;
  @Prop()
  vin:string;
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name})
  uid:string;
}
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
