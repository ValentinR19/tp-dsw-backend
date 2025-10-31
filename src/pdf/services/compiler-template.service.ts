import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as handlebars from 'handlebars';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateCompilerService {
  private readonly logger = new Logger(TemplateCompilerService.name);

  constructor() {
    this.registerHelpers();
  }

  private registerHelpers() {
    // Comparación básica
    Handlebars.registerHelper('ifEq', function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });

    // Formato de moneda seguro
    Handlebars.registerHelper('formatCurrency', function (value: any) {
      const num = parseFloat(value);
      if (isNaN(num)) return '$0,00';
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
      }).format(num);
    });

    // Formato de fecha
    Handlebars.registerHelper('formatDate', function (date: string | Date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    });

    // Incremental para enumerar filas (#)
    Handlebars.registerHelper('inc', function (value) {
      const n = parseInt(value);
      if (isNaN(n)) return '—';
      return n + 1;
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
