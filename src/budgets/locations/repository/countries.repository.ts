import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { Country } from '../countries.entity';

@Injectable()
export class CountriesRepository {
  constructor(@InjectRepository(Country) private readonly repository: Repository<Country>) {}

  async search(page: number, results: number, filters?: Partial<Country>, global?: string): Promise<IPaginated<Country>> {
    const qb = this.repository.createQueryBuilder('country');

    if (filters) {
      Object.keys(filters).forEach((key) => {
        qb.andWhere(`country.${key} = :${key}`, { [key]: (filters as any)[key] });
      });
    }

    if (global) {
      qb.andWhere(`(country.name LIKE :global OR country.iso3 LIKE :global OR country.iso2 LIKE :global)`, {
        global: `%${global}%`,
      });
    }

    const [data, count] = await qb
      .orderBy('country.name', 'ASC')
      .skip((page - 1) * results)
      .take(results)
      .getManyAndCount();

    return { data, count };
  }

  async findAll(queryRunner?: QueryRunner): Promise<Country[]> {
    const repo = queryRunner ? queryRunner.manager.getRepository(Country) : this.repository;
    return repo.find({ order: { name: 'ASC' } });
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Country> {
    const repo = queryRunner ? queryRunner.manager.getRepository(Country) : this.repository;
    return repo.findOneOrFail({ where: { id } });
  }

  async save(country: DeepPartial<Country>, queryRunner?: QueryRunner): Promise<Country> {
    const repo = queryRunner ? queryRunner.manager.getRepository(Country) : this.repository;
    return repo.save(country);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
