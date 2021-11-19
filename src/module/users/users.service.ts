import { ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
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

  async post(data:any) {


    const emailCheck= await this.userModel.findOne({
      email:data.email
    });

    const usernameCheck= await this.userModel.findOne({
      username:data.username
    });

    if (emailCheck){
      throw new NotAcceptableException({
        message:"User with this email already exist"
      });
    }
    if (usernameCheck){
      throw new NotAcceptableException({
        message:"User with this username already exist"
      });
    }
    const user = new this.userModel({
      first_name:data.first_name, last_name:data.last_name,
      email:data.email, password:data.password, phone:data.phone,
      username:data.username
    });
    return  await user.save();
  }

  async update(id: string, data:any) {
    return await this.userModel.findByIdAndUpdate(id, {
      first_name:data.first_name, last_name:data.last_name,
      email:data.email, password:data.password, phone:data.phone,
      username:data.username

    }).exec();
  }

}
