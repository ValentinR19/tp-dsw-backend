import { BudgetStatusTransition } from '@budgets-module/models/classes/budget-status-transition.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '@shared-module/types/find-options.type';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetStatusTransitionRepository {
  constructor(@InjectRepository(BudgetStatusTransition) private readonly repository: Repository<BudgetStatusTransition>) {}

  async findOneByOptions(options: FindOptions<BudgetStatusTransition>, queryRunner?: QueryRunner): Promise<BudgetStatusTransition> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetStatusTransition) : this.repository;
    return repository.findOneOrFail({
      where: options,
    });
  }

  async findAllByOptions(options?: FindOptions<BudgetStatusTransition>, queryRunner?: QueryRunner): Promise<BudgetStatusTransition[]> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetStatusTransition) : this.repository;
    return repository.find({
      select: {
        fromStatus: {
          id: true,
          name: true,
        },
        toStatus: {
          id: true,
          name: true,
        },
      },
      where: options,
      order: {
        transitionName: 'ASC',
      },
      relations: {
        fromStatus: true,
        toStatus: true,
      },
    });
  }

  async save(budgetTransition: Partial<BudgetStatusTransition>, queryRunner?: QueryRunner): Promise<BudgetStatusTransition> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetStatusTransition) : this.repository;
    return repository.save(budgetTransition);
  }
}
