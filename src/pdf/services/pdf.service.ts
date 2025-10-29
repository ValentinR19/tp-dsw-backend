import { Injectable } from '@nestjs/common';
import { convertHtmlToPdfMake } from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';
import * as path from 'path';
import * as PdfPrinter from 'pdfmake';

@Injectable()
export class PdfService {
  async generatePdfFromHtml(html: string, options?: { format?: string }): Promise<Buffer> {
    const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);
    const pdfContent = convertHtmlToPdfMake(html, { window: dom.window });

    const fonts = {
      Roboto: {
        normal: path.resolve('node_modules/pdfmake/fonts/Roboto-Regular.ttf'),
        bold: path.resolve('node_modules/pdfmake/fonts/Roboto-Medium.ttf'),
        italics: path.resolve('node_modules/pdfmake/fonts/Roboto-Italic.ttf'),
        bolditalics: path.resolve('node_modules/pdfmake/fonts/Roboto-MediumItalic.ttf'),
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
