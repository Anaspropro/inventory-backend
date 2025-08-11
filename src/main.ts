import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const isProd = configService.get('NODE_ENV') === 'production';

  app.useLogger(
    isProd ? ['error', 'warn'] : ['log', 'debug', 'error', 'warn', 'verbose'],
  );

  // Security headers in production
  if (isProd) {
    app.use(helmet());
  }

  // Validation settings
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: isProd, // Stricter in prod
      skipMissingProperties: !isProd, // Allow missing props in dev
      disableErrorMessages: isProd, // Hide detailed errors in prod
    }),
  );

  // CORS setup
  const allowedOrigins = isProd
    ? [process.env.FRONTEND_URL] // Only frontend domain in prod
    : ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Swagger setup — only in dev
  if (!isProd) {
    const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);
}

void bootstrap();
