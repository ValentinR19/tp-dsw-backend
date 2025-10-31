import { City } from '@main-module/locations/models/classes/city.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CityRepository {
  constructor(@InjectRepository(City) private readonly repository: Repository<City>) {}

  async search(page: number, resultSize: number, global: string, filters?: Partial<City>): Promise<IPaginated<City>> {
    const query = this.repository.createQueryBuilder('city');

    filters?.stateId && query.andWhere('city.stateId = :stateId', { stateId: filters.stateId });
    filters?.countryId && query.andWhere('city.countryId = :countryId', { countryId: filters.countryId });

    if (global) {
      query.andWhere(`city.name LIKE :global`, { global: `%${global}%` });
    } else {
      filters?.name && query.andWhere('city.name LIKE :name', { name: `%${filters.name}%` });
    }
    query.orderBy('city.name', 'ASC');
    const [data, count] = await query
      .skip((page - 1) * resultSize)
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }
}
