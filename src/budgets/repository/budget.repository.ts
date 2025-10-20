import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetRepository {
  constructor(@InjectRepository(Budget) private readonly repository: Repository<Budget>) {}

  async save(budget: DeepPartial<Budget>, queryRunner?: QueryRunner): Promise<Budget> {
    const repository = queryRunner ? queryRunner.manager.getRepository(Budget) : this.repository;
    return repository.save(budget);
  }

  async findAll(queryRunner?: QueryRunner): Promise<Budget[]> {
    const repository = queryRunner ? queryRunner.manager.getRepository(Budget) : this.repository;
    return repository.find();
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Budget> {
    const repository = queryRunner ? queryRunner.manager.getRepository(Budget) : this.repository;
    return repository.findOneOrFail({ where: { id: id } });
  }

  async findOneByRelations(id: number): Promise<Budget> {
    return this.repository.findOne({
      where: { id },
      relations: {
        items: true,
        budgetShipping: true,
        budgetBilling: true,
      },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
