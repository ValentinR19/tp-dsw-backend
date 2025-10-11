import { CreateBudgetAction } from '@budgets-module/actions/create-budget.action';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { LoggedUser } from '@shared-module/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';

@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly createBudgetAction: CreateBudgetAction,
  ) {}

  @Get()
  async findAll(): Promise<Budget[]> {
    return this.budgetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Budget> {
    return this.budgetService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateBudgetDto, @LoggedUser() user: IUserPayload): Promise<Budget> {
    return await this.createBudgetAction.execute({ dto, user });
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateBudgetDto>): Promise<Budget> {
    return this.budgetService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.budgetService.softDelete(id);
  }
}
