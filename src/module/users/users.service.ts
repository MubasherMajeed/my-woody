import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../../data/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }


  async findByEmail(username:String) : Promise<User|undefined>{
    const user= await this.userModel.findOne(user => user.userName === username);
    console.log(user);
    return user;
  }


  fetch(id? : string) {
    if (id) {
      return this.userModel.findById(id);
    }
    return this.userModel.find().exec();
  }

   delete(id?: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async post(fName: string, lName: string, email: string, password: string, phone: number, username: string,) {
    const user = new this.userModel({
      fName:fName, lName:lName, email:email, password:password, phone:phone, userName:username
    });
    return  await user.save();
  }

  async update(id: string, fName: string, lName: string, email: string, password: string, phone: number,username:string) {
    return await this.userModel.findByIdAndUpdate(id, {
      fName: fName,
      lName: lName,
      phone: phone,
      password: password,
      email: email,
      userName:username

    }).exec();
  }

}
