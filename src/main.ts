import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('Fydely')
      .setDescription('Todos los servicios para el manejo de cupones')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
}
bootstrap();
