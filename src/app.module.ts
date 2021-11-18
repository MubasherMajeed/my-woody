import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./module/users/users.module";
import { VehiclesModule } from "./module/vehicles/vehicles.module";
import { AppointmentsModule } from "./module/appointments/appointments.module";
import { Usersv2Module } from "./module/usersv2/usersv2.module";
import { AuthModule } from "./module/auth/auth.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/woody"), UsersModule, VehiclesModule,
    Usersv2Module
    , AppointmentsModule, AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
