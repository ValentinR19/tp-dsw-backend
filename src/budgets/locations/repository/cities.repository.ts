import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';
import { City } from '../cities.entity';

@Injectable()
export class CitiesRepository {
  constructor(@InjectRepository(City) private readonly repository: Repository<City>) {}

  async search(page: number, results: number, filters?: Partial<City>, global?: string): Promise<IPaginated<City>> {
    const qb = this.repository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.state', 'state') // si tus relaciones existen
      .leftJoinAndSelect('city.country', 'country');

    if (filters) {
      Object.keys(filters).forEach((key) => {
        qb.andWhere(`city.${key} = :${key}`, { [key]: (filters as any)[key] });
      });
    }

    if (global) {
      qb.andWhere(`(city.name LIKE :global OR state.name LIKE :global OR country.name LIKE :global)`, {
        global: `%${global}%`,
      });
    }

    const [data, count] = await qb
      .orderBy('city.name', 'ASC')
      .skip((page - 1) * results)
      .take(results)
      .getManyAndCount();

    return { data, count };
  }

  async findAll(queryRunner?: QueryRunner): Promise<City[]> {
    const repo = queryRunner ? queryRunner.manager.getRepository(City) : this.repository;
    return repo.find({ order: { name: 'ASC' } });
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<City> {
    const repo = queryRunner ? queryRunner.manager.getRepository(City) : this.repository;
    return repo.findOneOrFail({ where: { id } });
  }

  async findByStateId(stateId: number): Promise<City[]> {
    return this.repository.createQueryBuilder('city').where('city.state_id = :stateId', { stateId }).orderBy('city.name', 'ASC').getMany();
  }

  async findByCountryId(countryId: number): Promise<City[]> {
    return this.repository.createQueryBuilder('city').where('city.idCountry = :countryId', { countryId }).orderBy('city.name', 'ASC').getMany();
  }

  async save(city: DeepPartial<City>, queryRunner?: QueryRunner): Promise<City> {
    const repo = queryRunner ? queryRunner.manager.getRepository(City) : this.repository;
    return repo.save(city);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
