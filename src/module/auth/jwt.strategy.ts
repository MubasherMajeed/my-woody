import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }


  async validate(payload:any){
    return{_id:payload.sub,username:payload.username};
  }


}
