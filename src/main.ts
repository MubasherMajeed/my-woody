import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express/interfaces/nest-express-application.interface";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { UsersModule } from "./module/users/users.module";
import { AppointmentsModule } from "./module/appointments/appointments.module";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.enableCors();
  app.useStaticAssets(
    join(__dirname, "..", "upload"),
    {
      prefix: "/uploads/"
    }
  );



  const configUsers = new DocumentBuilder().setTitle("Woody").setDescription("Woody Api Description")
    .setVersion("1.0")
    .addTag("All Woody Api`s").addBearerAuth({
      type:"http",
      scheme:"bearer",
      bearerFormat:'jwt'
    },"access-token"
      ).build();

  const userDocument=SwaggerModule.createDocument(app,configUsers,
  );
  SwaggerModule.setup("api",app,userDocument);



  await app.listen(process.env.PORT || 3000);

}

bootstrap();
