import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../../data/schemas/user.schema";
import { Model } from "mongoose";
import * as blake2 from "blake2";
import { concatMapTo } from "rxjs";
import has = Reflect.has;

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }


  async findByUsername(username:string) : Promise<User|undefined>{
    return  this.userModel.findOne({ username: username });
  }


  fetch(id? : string) {
    if (id) {
      return this.userModel.findById(id);
    }
    return this.userModel.find().sort({
      "username":"DESC"
    }).exec();
  }




  search(data:any){
      return this.userModel.find({
            first_name:{ $regex: data.first_name }
      }).exec();
  }


  blake2(){
    var h = blake2.createHash('blake2b');
    h.update(Buffer.from("mubasher"));
    console.log(h.digest("hex"));
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
      throw new HttpException(
        "User with this email already exist",
        HttpStatus.NOT_ACCEPTABLE
      )
    }
    if (usernameCheck){
      throw new HttpException(
        "User with this username already exist",
        HttpStatus.NOT_ACCEPTABLE
      )
    }

    const user = new this.userModel(data);
    return  await user.save();
  }


  async update(id: string, data:any) {
    return await this.userModel.findByIdAndUpdate(id, data).exec();
  }

}
