import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument=User&mongoose.Document;

@Schema({timestamps:true})
export class User{

  @Prop()
  first_name:string;
  @Prop()
  last_name:string;
  @Prop()
  email:string
  @Prop()
  phone:number;
  @Prop()
  password:string;
  @Prop()
  username:string;
  @Prop()
  role:number;


}

export const UserSchema = SchemaFactory.createForClass(User);
