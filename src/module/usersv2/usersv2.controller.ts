import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Usersv2Service } from "./usersv2.service";
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Userv2 } from "../../data/schemas/userv2.schema";

@Controller("usersv")
export class Usersv2Controller {

  constructor(private readonly userv2Service: Usersv2Service) {
  }

  @Get()
  getUser(){
    return  this.userv2Service.fetch();
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("imagePath")
  )
  uploadFile(
    @Body() data:any,
    @UploadedFile() file: Express.Multer.File) {

    return this.userv2Service.insert(file.path,file.filename,data.name,data.email);


  }
}
