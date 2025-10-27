import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetRepository {
  constructor(@InjectRepository(Budget) private readonly repository: Repository<Budget>) {}

  async search(page: number, results: number, filters?: Partial<Budget>, global?: string): Promise<IPaginated<Budget>> {
    const queryBuilder = this.repository.createQueryBuilder('budget').leftJoinAndSelect('budget.customer', 'customer').leftJoinAndSelect('budget.status', 'status');

    if (filters) {
      Object.keys(filters).forEach((key) => {
        queryBuilder.andWhere(`budget.${key} = :${key}`, { [key]: (filters as any)[key] });
      });
    }

    if (global) {
      queryBuilder.andWhere(`(customer.name LIKE :global OR budget.code LIKE :global)`, { global: `%${global}%` });
    }

    const [data, count] = await queryBuilder
      .skip((page - 1) * results)
      .take(results)
      .getManyAndCount();

    return { data, count };
  }

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
