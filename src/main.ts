import { Logger as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module';
const logger = new NestLogger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');

  await app.listen(port || 3000, () => {
    logger.log(`🚀  Server ready at http://localhost:${port}`);
  });
}

bootstrap()
  .then(() => logger.log('All systems go'))
  .catch((e) => {
    logger.error(`❌  Error starting server, ${e}`);
  });
