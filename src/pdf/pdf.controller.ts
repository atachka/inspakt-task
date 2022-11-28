import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  StreamableFile,
  NotFoundException,
  Request,
  Req,
  Delete,
} from '@nestjs/common';
import { PDF } from './pdf.schema';
import { PDFDto, PDFParams } from 'src/dtos/pdf.dto';
import { PDFService } from './pdf.service';

@Controller('pdfs')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {}

  @Post()
  async createPdf(
    @Req() req: Request,
    @Body() body: PDFDto,
    @Query() params: PDFParams,
  ): Promise<string> {
    return this.pdfService.createProduct(
      body.html,
      +params.width,
      +params.height,
      req.body['authKey'],
    );
  }

  @Get('/download/:id')
  async downloadPdf(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<StreamableFile | NotFoundException> {
    return this.pdfService.downloadPdf(id, req.body['authKey']);
  }
  @Get()
  async getPdfIds(@Req() req: Request): Promise<PDF[] | NotFoundException> {
    return this.pdfService.getPdfIds(req.body['authKey']);
  }
  @Get(':id')
  async getPdf(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<PDF | NotFoundException> {
    return this.pdfService.getPdf(id, req.body['authKey']);
  }

  @Delete(':id')
  async deletePdf(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<string | NotFoundException> {
    return this.pdfService.deletePdf(id, req.body['authKey']);
  }
}
