import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

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

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetRepository.findOneBy({ UniqueID: id });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    await this.findOne(id); // ensure it exists
    await this.budgetRepository.update(id, updateBudgetDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.budgetRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Budget not found');
  }
}
