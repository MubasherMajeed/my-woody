import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";

export type Userv2Document = Userv2 & Document;


@Schema()
export class Userv2{
  @Prop()
  imagePath:string
  @Prop()
  imageName:string
  @Prop()
  name:string
  @Prop()
  email:string
}


export const Userv2Schema=SchemaFactory.createForClass(Userv2);
