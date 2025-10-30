import { BudgetPdfService } from '@budgets-module/services/budget-pdf.service';
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { Response } from 'express';

@Controller(':budgetId/pdf')
@UseGuards(JwtAuthGuard)
export class BudgetPdfController {
  constructor(private readonly budgetPdfService: BudgetPdfService) {}

  @Get('voucher')
  async generateVoucherPdf(@Param('budgetId') budgetId: number, @Res() res: Response): Promise<void> {
    const pdfBuffer = await this.budgetPdfService.generateVoucher(budgetId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=budget_${budgetId}_voucher.pdf`,
    });
    res.send(pdfBuffer);
  }
}
