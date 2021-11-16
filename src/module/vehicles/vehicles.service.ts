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

  async post(year: string, make: string, model: string, vin: string, uid:string) {
    const vehicle = new this.model({
      year:year, make:make, model:model, vin:vin, uid:uid
    });
    return  await vehicle.save();
  }

  async update(id: string, year: string, make: string, model: string, vin: string, uid: mongoose.Schema.Types.ObjectId) {
    return await this.model.findByIdAndUpdate(id, {
      year: year,
      make: make,
      model: model,
      vin: vin,
      uid: uid

    }).exec();
  }


}
