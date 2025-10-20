import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetRepository } from '@budgets-module/repository/budget.repository';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, QueryRunner } from 'typeorm';

@Injectable()
export class BudgetService {
  private logger: Logger = new Logger(BudgetService.name);

  constructor(private readonly budgetRepository: BudgetRepository) {}

  async findAll(): Promise<Budget[]> {
    return this.budgetRepository.findAll();
  }

  async findOne(id: number, queryRunner?: QueryRunner): Promise<Budget> {
    try {
      this.logger.log(`Se busca el presupuesto con el id: ${id}`);
      const budget = await this.budgetRepository.findById(id, queryRunner);
      this.logger.log(`Se encontro el presupuesto con el id: ${id}`);
      return budget;
    } catch (error) {
      throw new NotFoundException('Budget not found');
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      this.logger.log(`Se elimina el presupuesto con el id: ${id}`);
      await this.budgetRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async save(budget: DeepPartial<Budget>, queryRunner?: QueryRunner): Promise<Budget> {
    try {
      this.logger.log(`Comienza la creacion de un presupuesto con la siguiente informacion: ${JSON.stringify(budget)}`);
      const savedBudget = await this.budgetRepository.save(budget, queryRunner);
      this.logger.log(`Se creo el presupuesto con el id: ${savedBudget.id}`);
      return savedBudget;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
