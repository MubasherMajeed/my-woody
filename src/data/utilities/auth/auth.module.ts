import { Module } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "../../../module/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports:[UsersModule, PassportModule,JwtModule.register({
    secret:JwtConstants.secret,
    signOptions:{expiresIn: '24h'}
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]

})
export class AuthModule {}

