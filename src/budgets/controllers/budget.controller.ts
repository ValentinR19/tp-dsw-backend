import { Budget } from '@budgets-module/models/classes/budget.entity';
import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('budgets')
// @UseGuards(JwtAuthGuard)  //Esto es para que te exija la autenticacion en las rutas.
export class BudgetController {
  constructor(private service: BudgetService) {}

  @Post()
  async create(@Body() dto: CreateBudgetDto): Promise<Budget> {
    return await this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<Budget[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Budget> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateBudgetDto>): Promise<Budget> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.softDelete(id);
  }
}
