import { Module } from "@nestjs/common";
import { Usersv2Service } from "./usersv2.service";
import { Usersv2Controller } from "./usersv2.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Userv2, Userv2Schema } from "../../data/schemas/userv2.schema";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [MongooseModule.forFeature([{ name: Userv2.name, schema: Userv2Schema }]),
    MulterModule.register({
      dest: "./upload"
    })
  ],
  providers: [Usersv2Service],
  controllers: [Usersv2Controller]
})
export class Usersv2Module {
}
