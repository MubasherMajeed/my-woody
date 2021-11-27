import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Post } from "@nestjs/common/decorators";
import { TaskService } from "./task.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { deleteTaskDto, taskDto } from "../../../dto/dto";


@ApiTags("Corn Jobs")
@Controller('task')
export class TaskController {

  constructor(private readonly taskService:TaskService) {
  }

  @Get("stop")
  stopCronJob(){
    this.taskService.stopCronJob();
  }

  @ApiBody(
    {
      type:taskDto
    }
  )
  @Post("add")
  addCronJob(@Body() data:any){
    this.taskService.addCronJob(data);
  }

  @ApiBody({
    type:deleteTaskDto
  })
  @Delete("delete")
  deleteCronJob(@Body() data:any){
    this.taskService.deleteCronJob(data);

  }




}
