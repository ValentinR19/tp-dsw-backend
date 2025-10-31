import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts;
  }

  async generatePdfFromHtml(html: string, metadata?: any): Promise<Buffer> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfOptions: any = {
      printBackground: true,
      margin: metadata?.margin ?? { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    };

    if (metadata?.format) {
      pdfOptions.format = metadata.format;
    } else if (metadata?.width && metadata?.height) {
      pdfOptions.width = metadata.width;
      pdfOptions.height = metadata.height;
    }

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();
    return Buffer.from(pdfBuffer);
  }

  async generatePdfFromDefinition(documentDefinition: any): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.getBuffer((buffer: Buffer) => {
        if (buffer) {
          resolve(buffer);
        } else {
          reject(new Error('Error generando PDF con pdfMake'));
        }
      });
    });
  }
}
