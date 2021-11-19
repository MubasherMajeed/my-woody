import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../../data/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }


  async findByEmail(username:string) : Promise<User|undefined>{
    const user= await this.userModel.findOne({username:username});
    // console.log(user);
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
      first_name:fName, last_name:lName, email:email, password:password, phone:phone, username:username
    });
    return  await user.save();
  }

  async update(id: string, fName: string, lName: string, email: string, password: string, phone: number,username:string) {
    return await this.userModel.findByIdAndUpdate(id, {
      first_name: fName,
      last_name: lName,
      phone: phone,
      password: password,
      email: email,
      username:username

    }).exec();
  }

}
