import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Vehicle, VehicleDocument } from "../../data/schemas/vehicle.schema";
import mongoose from "mongoose";

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicle.name) private readonly model:Model<VehicleDocument>) {
  }

  fetch(id?: string) {
    if (id) {
      return this.model.findById(id);
    }
    return this.model.find().populate('uid').exec();
  }


  delete(id?: string) {
    return this.model.findByIdAndDelete(id);
  }

  async post(data:any) {
    const vehicle = new this.model({
      year:data.year, make:data.make, model:data.model, vin:data.vin, uid:data.uid
    });
    return  await vehicle.save();
  }

  async update(id: string, data:any) {
    return await this.model.findByIdAndUpdate(id, {
      year:data.year, make:data.make, model:data.model, vin:data.vin, uid:data.uid
    }).exec();
  }


}
