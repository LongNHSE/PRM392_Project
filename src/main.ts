import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { MongoExceptionFilter } from './common/validation/mongooseValidation.validation';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  // app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter()); // Use Mongo exception filter

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useGlobalFilters(new HttpExceptionFilter()); // Use validation pipe

  // Configure the class-validator and class-transformer libraries to use the NestJS dependency injection container.
  // This allows these libraries to access services that are managed by NestJS.
  // The 'fallbackOnErrors' option is set to true, which means that if a requested dependency is not found in the NestJS container,
  // these libraries will try to instantiate it themselves.
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(8000);
}
bootstrap();
