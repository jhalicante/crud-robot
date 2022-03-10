import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
  });

  const PORT = process.env.PORT || 3001;
  const apiVersionOne = 'api/v1';
  const appTitle = 'Robot CRUD';

  app.setGlobalPrefix(apiVersionOne); //  Eg: api/v1/*

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle(`${appTitle} - API Documentation`)
    .setDescription(`${appTitle} documentation of the application`)
    .setVersion('1.0')
    .setExternalDoc('For more information', 'https://github.com/jhalicante')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: `${appTitle} - API Documentation`,
    customfavIcon: '/favicon.ico',
  });

  await app.listen(PORT, () => {
    Logger.log(`Server is now running in development at port ${PORT}`); // unless $PORT is undefined, in which case you're listening to 8081.
  });
}
bootstrap();
