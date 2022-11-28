import { Injectable, StreamableFile, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PDF } from './pdf.schema';
import * as puppeteer from 'puppeteer';
@Injectable()
export class PDFService {
  constructor(@InjectModel('PDF') private readonly PDFModel: Model<PDF>) {}

  async createProduct(
    html: string,
    width: number,
    height: number,
    authKey: string,
  ): Promise<string> {
    const createdPdf = await this.PDFModel.create({
      html,
      width,
      height,
      authKey,
    });
    return `${createdPdf.id}`;
  }
  async downloadPdf(
    id: string,
    authKey: string,
  ): Promise<StreamableFile | NotFoundException> {
    try {
      const pdfOptions = await this.PDFModel.findOne({
        $and: [
          {
            _id: {
              $eq: id,
            },
          },
          {
            authKey: {
              $eq: authKey,
            },
          },
        ],
      });
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(pdfOptions.html);
      await page.emulateMediaType('screen');
      const pdf = await page.pdf({
        width: pdfOptions.width,
        height: pdfOptions.height,
        printBackground: true,
        path: 'es.pdf',
      });
      const file = await new StreamableFile(pdf);
      file.options.type = '.pdf';
      file.options.disposition = 'download';
      return file;
    } catch (err) {
      throw new NotFoundException("PDF doesn't exist");
    }
  }

  async getPdfIds(authKey: string): Promise<PDF[] | NotFoundException> {
    const pdfs = await this.PDFModel.find({ authKey });
    if (pdfs.length === 0) {
      throw new NotFoundException('No PDFs exist');
    }
    return pdfs;
  }

  async getPdf(id: string, authKey: string): Promise<PDF | NotFoundException> {
    const pdf = await this.PDFModel.findOne({
      $and: [
        {
          _id: {
            $eq: id,
          },
        },
        {
          authKey: {
            $eq: authKey,
          },
        },
      ],
    });
    if (pdf === null) {
      throw new NotFoundException("PDF doesn't exist");
    }
    return pdf;
  }
  async deletePdf(
    id: string,
    authKey: string,
  ): Promise<string | NotFoundException> {
    const pdf = await this.PDFModel.findOne({
      $and: [
        {
          _id: {
            $eq: id,
          },
        },
        {
          authKey: {
            $eq: authKey,
          },
        },
      ],
    });
    if (pdf === null) {
      throw new NotFoundException("PDF doesn't exist");
    }
    await this.PDFModel.findByIdAndDelete(id);
    return 'Pdf Deleted';
  }
}
