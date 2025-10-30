import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { TemplateCompilerService } from '@main-module/pdf/services/compiler-template.service';
import { PdfService } from '@main-module/pdf/services/pdf.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BudgetPdfService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly templateCompilerService: TemplateCompilerService,
    private readonly budgetService: BudgetService,
  ) {}

  async generateVoucher(budgetId: number): Promise<Buffer> {
    const budget = await this.budgetService.findById(budgetId);
    return await this.generateBudgetVoucherPdf(budget);
  }

  async generateBudgetVoucherPdf(budget: Partial<Budget>): Promise<Buffer> {
    const templatePath = `dist/src/budgets/handlebars/budget-voucher.hbs`;
    const compiledTemplate = await this.templateCompilerService.compileTemplate(templatePath, { budget });
    return this.pdfService.generatePdfFromHtml(compiledTemplate, { format: 'A4' });
  }
}
