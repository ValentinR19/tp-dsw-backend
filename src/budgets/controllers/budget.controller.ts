import { CreateBudgetAction } from '@budgets-module/actions/create-budget.action';
import { UpdateBudgetAction } from '@budgets-module/actions/update-budget.action';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LoggedUser } from '@shared-module/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { BudgetFormMapper } from './mappers/budget-form.mapper';

@Controller()
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly createBudgetAction: CreateBudgetAction,
    private readonly updateBudgetAction: UpdateBudgetAction,
  ) {}

  @Get('page/:pageNumber')
  async search(@Param('pageNumber', ParseIntPipe) page: number, @Query() dto: PaginatedQueryDTO<Budget>): Promise<IPaginated<Budget>> {
    return this.budgetService.search(page, dto);
  }

  @Get()
  async findAll(): Promise<Budget[]> {
    return this.budgetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BudgetFormMapper> {
    const budget = await this.budgetService.findById(id);
    return BudgetFormMapper.toForm(budget);
  }

  @Post()
  async create(@Body() dto: CreateBudgetDto, @LoggedUser() user: IUserPayload): Promise<Budget> {
    return await this.createBudgetAction.execute({ dto, user });
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateBudgetDto>): Promise<Budget> {
    return this.updateBudgetAction.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.budgetService.softDelete(id);
  }
}
