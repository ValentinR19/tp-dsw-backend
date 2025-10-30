import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import * as path from 'path';
import * as PdfPrinter from 'pdfmake';

const htmlToPdfmake = require('html-to-pdfmake');

@Injectable()
export class PdfService {
  async generatePdfFromHtml(html: string, options?: { format?: string }): Promise<Buffer> {
    const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);
    const pdfContent = htmlToPdfmake(html, { window: dom.window });

    const fonts = {
      Roboto: {
        normal: path.join(process.cwd(), 'fonts/roboto/static/Roboto-Regular.ttf'),
        bold: path.join(process.cwd(), 'fonts/roboto/static/Roboto-Bold.ttf'),
        italics: path.join(process.cwd(), 'fonts/roboto/static/Roboto-Italic.ttf'),
        bolditalics: path.join(process.cwd(), 'fonts/roboto/static/Roboto-BoldItalic.ttf'),
      },
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: pdfContent,
      defaultStyle: { font: 'Roboto', fontSize: 10 },
      pageSize: options?.format || 'A4',
      pageMargins: [40, 60, 40, 60],
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });
  }
}
