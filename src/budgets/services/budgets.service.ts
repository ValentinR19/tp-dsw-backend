import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetRepository } from '@budgets-module/repository/budget.repository';
import { Injectable, Logger } from '@nestjs/common';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial, QueryRunner } from 'typeorm';

@Injectable()
export class BudgetService {
  private logger: Logger = new Logger(BudgetService.name);

  constructor(private readonly budgetRepository: BudgetRepository) {}

  async search(page: number, dto: PaginatedQueryDTO<Budget>): Promise<IPaginated<Budget>> {
    const { results, filters, global } = dto;
    return this.budgetRepository.search(page, results, filters, global);
  }

  async findAll(): Promise<Budget[]> {
    return this.budgetRepository.findAll();
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Budget> {
    try {
      //this.logger.log(`Se busca el presupuesto con el id: ${id}`);
      const budget = await this.budgetRepository.findById(id, queryRunner);
      //this.logger.log(`Se encontro el presupuesto con el id: ${id}`);
      return budget;
    } catch (error) {
      throw new NotFoundErrorException(Budget.name, error);
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      //this.logger.log(`Se elimina el presupuesto con el id: ${id}`);
      await this.budgetRepository.softDelete(id);
    } catch (error) {
      throw new NotSavedErrorException(Budget.name, error);
    }
  }

  async save(budget: DeepPartial<Budget>, queryRunner?: QueryRunner): Promise<Budget> {
    try {
      //this.logger.log(`Comienza la creacion de un presupuesto con la siguiente informacion: ${JSON.stringify(budget)}`);
      const savedBudget = await this.budgetRepository.save(budget, queryRunner);
      //this.logger.log(`Se creo el presupuesto con el id: ${savedBudget.id}`);
      return savedBudget;
    } catch (error) {
      throw new NotSavedErrorException(Budget.name, error);
    }
  }

  async update(id: number, dto: Partial<Budget>, queryRunner?: QueryRunner): Promise<Budget> {
    try {
      //this.logger.log(`Comienza la actualizacion del presupuesto con id: ${id}`);
      const updatedBudget = await this.budgetRepository.save({ id, ...dto }, queryRunner);
      //this.logger.log(`Se actualizo el presupuesto con id: ${id}`);
      return updatedBudget;
    } catch (error) {
      throw new NotSavedErrorException(Budget.name, error);
    }
  }
}
