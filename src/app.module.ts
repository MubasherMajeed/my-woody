import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./module/users/users.module";
import { VehiclesModule } from "./module/vehicles/vehicles.module";
import { AppointmentsModule } from "./module/appointments/appointments.module";
import { Usersv2Module } from "./module/usersv2/usersv2.module";
import { AuthModule } from "./data/utilities/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskModule } from "./data/utilities/task_scheduling/task/task.module";
import { EventsModule } from "./web_scokets/events/events.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://mubashir:123@cluster0.crunx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"), UsersModule, VehiclesModule,
    Usersv2Module,
    ConfigModule.forRoot()
    , AppointmentsModule, AuthModule,
    EventsModule,
    ScheduleModule.forRoot(),TaskModule

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
