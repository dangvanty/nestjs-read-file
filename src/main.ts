import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Cấu hình để các route không phải API trả về index.html
  app.useStaticAssets(join(__dirname, '..', 'build'));

  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith('/api')) {
      res.sendFile(join(__dirname, '..', 'build', 'index.html'));
      console.log(join(__dirname, '..', 'build', 'index.html'));
    } else {
      next();
    }
  });
  await app.listen(process.env.PORT ?? 8389);
}
bootstrap();
