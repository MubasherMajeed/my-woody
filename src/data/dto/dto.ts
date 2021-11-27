import { ApiProperty } from "@nestjs/swagger";


export class AppointmentStatusDto{
  @ApiProperty()
  status:number
}

export class UserDto{

  @ApiProperty()
  first_name:string;
  @ApiProperty()
  last_name:string;
  @ApiProperty()
  email:string
  @ApiProperty()
  password:string;
  @ApiProperty()
  role:number;
  @ApiProperty()
  phone:number;
  @ApiProperty()
  username:string;



}


export class UserSearchDto{
  @ApiProperty()
  first_name:string
}

export class taskDto{
  @ApiProperty()
  name:string
  @ApiProperty()
  seconds:string

}
export class deleteTaskDto{
  @ApiProperty()
  name:string
}



export class UserV2Dto{
  @ApiProperty()
  name:string
  @ApiProperty()
  email:string
  @ApiProperty({ type: String, format: 'binary'})
  image: string
}


export class emailDto{
  @ApiProperty()
  email:string
  @ApiProperty()
  first_name:string
  @ApiProperty()
  status:number

}

export class LoginDto{
  @ApiProperty()
  username:string
  @ApiProperty()
  password:string

}

export class VehicleDto {
  @ApiProperty()
  year:string;
  @ApiProperty()
  make:string;
  @ApiProperty()
  model:string;
  @ApiProperty()
  vin:string;
  @ApiProperty()
  uid:string;
}

export class Dto {
  @ApiProperty()
  aType:number
  @ApiProperty()
  serviceType:number;
  @ApiProperty()
  description:string;
  @ApiProperty()
  date:Date;
  @ApiProperty()
  timeFrom:string;
  @ApiProperty()
  timeTo:string;
  @ApiProperty()
  addressLine1:string;
  @ApiProperty()
  addressLine2:string;
  @ApiProperty()
  city:string;
  @ApiProperty()
  state:string;
  @ApiProperty()
  zipCode:number;
  @ApiProperty()
  status:number;
  @ApiProperty({
    description:"User Id "
  })
   uid: string;

}
