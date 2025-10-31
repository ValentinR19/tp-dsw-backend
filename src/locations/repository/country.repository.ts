import { Country } from '@main-module/locations/models/classes/country.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CountryRepository {
  constructor(@InjectRepository(Country) private readonly repository: Repository<Country>) {}

  async search(page: number, resultSize: number, global?: string, filters?: Partial<Country>): Promise<IPaginated<Country>> {
    const query = this.repository.createQueryBuilder('country');
    query.select(['country.id', 'country.name', 'country.iso2', 'country.iso3']);
    if (global) {
      query.andWhere(`(country.name LIKE :global OR country.iso3 LIKE :global OR country.iso2 LIKE :global)`, { global: `%${global}%` });
    } else {
      filters?.name && query.andWhere('country.name LIKE :name', { name: `%${filters.name}%` });
      filters?.iso3 && query.andWhere('country.iso3 LIKE :iso3', { iso3: `%${filters.iso3}%` });
      filters?.iso2 && query.andWhere('country.iso2 LIKE :iso2', { iso2: `%${filters.iso2}%` });
    }

    query.orderBy('country.name', 'ASC');
    const [data, count] = await query
      .skip((page - 1) * resultSize)
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async findById(id: number): Promise<Country> {
    const query = this.repository.createQueryBuilder('country');

    query.where('country.id = :id', { id });

    query.leftJoinAndSelect('country.states', 'states');
    query.leftJoinAndSelect('states.cities', 'cities');

    query.select(['country.id', 'country.name', 'states.id', 'states.name', 'cities.id', 'cities.idState', 'cities.name']);

    return await query.getOneOrFail();
  }

  async getAll(): Promise<Country[]> {
    return await this.repository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
