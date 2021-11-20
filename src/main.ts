import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express/interfaces/nest-express-application.interface";
import { join } from "path";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.enableCors();
  app.useStaticAssets(
    join(__dirname,"..","upload"),
    {
      prefix:"/uploads/"
    }
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
