import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Usersv2Service } from "./usersv2.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserV2Dto } from "../../data/dto/dto";

@ApiTags("UServ2")
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
    FileInterceptor("image")
  )
  // @ApiBody({
  //   type:UserV2Dto
  // })
  // @ApiImplicitFile({
  //   name:'file',
  //   required:true
  // })
  @ApiConsumes('multipart/form-data')
  uploadFile(
    @Body() data:UserV2Dto,
    @UploadedFile() file) {
    // console.log(file)
    // console.log(data)
    return this.userv2Service.insert(file.path,file.filename,data.name,data.email);


  }
}
