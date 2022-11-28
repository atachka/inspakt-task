import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleWare } from './middleware/auth.middleware';
import { PDFModule } from './pdf/pdf.module';

@Module({
  imports: [
    PDFModule,
    MongooseModule.forRoot(
      'mongodb+srv://atachka:Password123@cluster0.7vrqfg4.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
