import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PDFController } from './pdf.controller';
import { PDFSchema } from './pdf.schema';
import { PDFService } from './pdf.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PDF', schema: PDFSchema }])],
  controllers: [PDFController],
  providers: [PDFService],
})
export class PDFModule {}
