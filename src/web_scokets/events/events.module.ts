import { Module } from "@nestjs/common";
import { EventsGatway } from "./events.gatway";


@Module({
  providers:[EventsGatway]
})
export class EventsModule{}