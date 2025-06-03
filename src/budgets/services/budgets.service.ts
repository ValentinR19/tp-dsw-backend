import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { UpdateBudgetDto } from '@budgets-module/models/dto/update-budget.dto';
import { Budget } from '@budgets-module/models/entities/budget.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const budget = this.budgetRepository.create(createBudgetDto);
    return this.budgetRepository.save(budget);
  }

  async findAll(): Promise<Budget[]> {
    return this.budgetRepository.find();
  }

  async findOne(id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOneBy({ id });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    await this.findOne(id); // ensure it exists
    await this.budgetRepository.update(id, updateBudgetDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.budgetRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException('Budget not found');
  }
}
