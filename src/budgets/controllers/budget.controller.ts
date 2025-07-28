import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('budgets')
export class BudgetController {
  constructor(private service: BudgetService) {}

  @Post()
  create(@Body() dto: CreateBudgetDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateBudgetDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
