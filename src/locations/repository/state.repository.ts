import { State } from '@main-module/locations/models/classes/state.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { Repository } from 'typeorm';

@Injectable()
export class StateRepository {
  constructor(
    @InjectRepository(State)
    private readonly repository: Repository<State>,
  ) {}

  async search(page: number, resultSize: number, global?: string, filters?: Partial<State>): Promise<IPaginated<State>> {
    const query = this.repository.createQueryBuilder('state');
    query.select(['state.id', 'state.name', 'state.country_code']);
    filters?.countryId && query.where('state.idCountry = :idCountry', { idCountry: filters.countryId });
    if (global) {
      query.andWhere(`(state.name LIKE :global OR state.country_code LIKE :global)`, { global: `%${global}%` });
    } else {
      filters?.name && query.andWhere('state.name LIKE :name', { name: `%${filters.name}%` });
    }
    query.orderBy('state.name', 'ASC');
    const [data, count] = await query
      .skip((page - 1) * resultSize)
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }
}
