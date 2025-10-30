import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { State } from '../states.entity';

@Injectable()
export class StatesRepository {
  constructor(@InjectRepository(State) private readonly repository: Repository<State>) {}

  async search(page: number, results: number, filters?: Partial<State>, global?: string): Promise<IPaginated<State>> {
    const qb = this.repository.createQueryBuilder('state');

    if (filters) {
      Object.keys(filters).forEach((key) => {
        qb.andWhere(`state.${key} = :${key}`, { [key]: (filters as any)[key] });
      });
    }

    if (global) {
      qb.andWhere(`(state.name LIKE :global OR country.name LIKE :global OR state.state_code LIKE :global)`, {
        global: `%${global}%`,
      });
    }

    const [data, count] = await qb
      .orderBy('state.name', 'ASC')
      .skip((page - 1) * results)
      .take(results)
      .getManyAndCount();

    return { data, count };
  }

  async findAll(queryRunner?: QueryRunner): Promise<State[]> {
    const repo = queryRunner ? queryRunner.manager.getRepository(State) : this.repository;
    return repo.find({ order: { name: 'ASC' } });
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<State> {
    const repo = queryRunner ? queryRunner.manager.getRepository(State) : this.repository;
    return repo.findOneOrFail({ where: { id } });
  }

  async findByCountryId(countryId: number): Promise<State[]> {
    return this.repository
      .createQueryBuilder('state')
      .where('state.country_id = :countryId', { countryId }) // usa el nombre de columna
      .orderBy('state.name', 'ASC')
      .getMany();
  }

  async save(state: DeepPartial<State>, queryRunner?: QueryRunner): Promise<State> {
    const repo = queryRunner ? queryRunner.manager.getRepository(State) : this.repository;
    return repo.save(state);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
