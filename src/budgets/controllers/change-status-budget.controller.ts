import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetChangeStatusService } from '@budgets-module/services/budget-change-status.service';
import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Controller, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { LoggedUser } from '@shared-module/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';

@Controller(':budgetId')
@UseGuards(JwtAuthGuard)
export class ChangeStatusBudgetController {
  constructor(private readonly changeStatusBudgetService: BudgetChangeStatusService) {}

  @Put('authorize')
  async authorize(@Param('budgetId', ParseIntPipe) id: number, @LoggedUser() user: IUserPayload): Promise<Budget> {
    return this.changeStatusBudgetService.changeStatus(id, 'Autorizar', user);
  }

  @Put('confirm')
  async confirm(@Param('budgetId', ParseIntPipe) id: number, @LoggedUser() user: IUserPayload): Promise<Budget> {
    return this.changeStatusBudgetService.changeStatus(id, 'Confirmar', user);
  }

  @Put('finalize')
  async finalize(@Param('budgetId', ParseIntPipe) id: number, @LoggedUser() user: IUserPayload): Promise<Budget> {
    return this.changeStatusBudgetService.changeStatus(id, 'Finalizar', user);
  }

  @Put('revoke')
  async revoke(@Param('budgetId', ParseIntPipe) id: number, @LoggedUser() user: IUserPayload): Promise<Budget> {
    return this.changeStatusBudgetService.revokeBudget(id, user);
  }
}
