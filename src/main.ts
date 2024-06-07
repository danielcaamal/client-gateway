import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomRPCExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new CustomRPCExceptionFilter());
  const logger = new Logger('Gateway');
  await app.listen(envs.PORT);
  logger.log(`Gateway is running on ${envs.PORT}`);
}
bootstrap();
