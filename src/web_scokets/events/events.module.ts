import { Module } from "@nestjs/common";
import { EventsGateway } from "./eventsGateway";


@Module({
  providers:[EventsGateway]
})
export class EventsModule{}