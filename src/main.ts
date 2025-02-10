import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import appConfig from './configs/server.config';
import { ObjectIdConversionInterceptor } from './share/interceptors/objectId.interceptor';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appConfig(app);

  app.useGlobalInterceptors(new ObjectIdConversionInterceptor());
  await app.listen(configService.get<number>('PORT') || 3000);
}

bootstrap();
