import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as handlebars from 'handlebars';

@Injectable()
export class TemplateCompilerService {
  private readonly logger = new Logger(TemplateCompilerService.name);

  constructor() {
    this.registerHelpers();
  }

  private registerHelpers() {
    Handlebars.registerHelper('ifEq', function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper('formatCurrency', function (value: number) {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
      }).format(value);
    });

    Handlebars.registerHelper('formatDate', function (date: string | Date) {
      const d = new Date(date);
      return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    });

    Handlebars.registerHelper('toCurrency', function (value: number, currency: string) {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency || 'ARS',
      }).format(value);
    });
  }

  async compileTemplate(templatePath: string, data: any): Promise<string> {
    try {
      this.logger.log(`Compiling template: ${templatePath}`);
      const templateContent = await fs.readFile(templatePath, 'utf8');
      const template = handlebars.compile(templateContent);
      return template(data);
    } catch (error) {
      this.logger.error(`Error compiling template at ${templatePath}:`, error);
      throw error;
    }
  }
}
