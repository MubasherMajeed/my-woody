import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type UserDocument=User&mongoose.Document;

@Schema({timestamps:true})
export class User{

  @Prop()
  fName:string;
  @Prop()
  lName:string;
  @Prop()
  email:string
  @Prop()
  phone:number;
  @Prop()
  password:string;
  @Prop()
  userName:string;


}

export const UserSchema = SchemaFactory.createForClass(User);
