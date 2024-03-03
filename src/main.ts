import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('FIVERR API')
    .addBearerAuth()
    .setDescription('')
    .setVersion('1.0')
    .build();

  const swagger = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, swagger);
  await app.listen(3000);
}
bootstrap();
