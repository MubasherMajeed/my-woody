import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Userv2, Userv2Document } from "../../data/schemas/userv2.schema";
import { Model } from "mongoose";
import { threadId } from "worker_threads";

@Injectable()
export class Usersv2Service {
  constructor(@InjectModel(Userv2.name) private readonly userv2Model:Model<Userv2Document>) {
  }


   fetch(id?:string){
    if (id){
     return this.userv2Model.findById(id);
    }
    return this.userv2Model.find().exec();
  }



   async insert(imagePath:string,imageName:string,name:string,email:string){
    const data = new this.userv2Model({
      imagePath:imagePath,
      imageName:imageName,
      name:name,
      email:email
    });
    return  await data.save();
  }

}
