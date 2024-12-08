import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const config = new DocumentBuilder()
     .setTitle('Module API') // Title of the API documentation
     .setDescription('API for managing modules and resources in a course') // Description of the API
     .setVersion('1.0') // Version of the API
     .addTag('modules') // Add a tag to group your endpoints
     .build();

  const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document); // `api` is the path where Swagger UI will be available

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
