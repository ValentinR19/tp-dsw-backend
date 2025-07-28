import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {}
