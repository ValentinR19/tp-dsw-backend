import { Injectable, NotFoundException } from '@nestjs/common';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { CustomerCategory } from '../models/classes/customer-category.entity';
import { CreateCustomerCategoryDto } from '../models/dto/create-customer-category.dto';
import { UpdateCustomerCategoryDto } from '../models/dto/update-customer-category.dto';
import { CustomerCategoryRepository } from '../repositories/customer-category.repository';

@Injectable()
export class CustomerCategoryService {
  constructor(private readonly repository: CustomerCategoryRepository) {}

  /* Este es el metodo para buscar todos sin paginación ni filtros */
  async findAll(): Promise<CustomerCategory[]> {
    return await this.repository.findAll();
  }

  /* Este es el método para paginar */
  async search(page: number, dto: PaginatedQueryDTO<CustomerCategory>): Promise<IPaginated<CustomerCategory>> {
    const { results, filters, global } = dto;
    return await this.repository.search(page, results, filters, global);
  }

  /* Si no lo encuentra rejecta directamente el repository. Aca capturamos el error */
  async findOne(id: number, includeDeleted = false) {
    try {
      return await this.repository.findById(id, includeDeleted);
    } catch (eror) {
      throw new NotFoundException(`CustomerCategory ${id} no encontrada`);
    }
  }

  async save(entity: Partial<CustomerCategory>) {
    try {
      return this.repository.save(entity);
    } catch (error) {
      throw new NotSavedErrorException(CustomerCategory.name, error);
    }
  }

  async create(dto: CreateCustomerCategoryDto) {
    return this.save(dto);
  }

  /* En este metodo reutilizamos metodos del servicios que ya captuan errores
  Por ende no hace falta hacerlo de nuevo */
  async update(id: number, dto: UpdateCustomerCategoryDto) {
    await this.findOne(id);
    return await this.save({ id, ...dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repository.softDeleteById(id);
    return { id, deleted: true };
  }

  async restore(id: number) {
    await this.repository.restoreById(id);
    return this.findOne(id);
  }
}
