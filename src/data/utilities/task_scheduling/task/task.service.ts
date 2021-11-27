import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class TaskService {
  constructor(private schedualerRegistory:SchedulerRegistry) {
  }


  private readonly logger= new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_30_SECONDS,{
    name:"notifications"
  })
  handleCron(){
    this.logger.debug("called every 30 second");
  }

  stopCronJob(){
    const job = this.schedualerRegistory.getCronJob("notifications");
    job.stop();
    console.log(job.lastDate());

  }
  addCronJob(data:any){
    const job= new CronJob(`${data.seconds} * * * * *`,()=>{
      this.logger.warn(`time (${data.seconds}) for job ${data.name} to run !`);
    });
    this.schedualerRegistory.addCronJob(data.name,job);
    job.start();

    this.logger.warn(`job ${data.name} added for each minute at ${data.seconds} seconds`);
  }

  deleteCronJob(data:any){
    this.schedualerRegistory.deleteCronJob(data.name);
    this.logger.warn(`job ${data.name} is deleted`);
  }





}
