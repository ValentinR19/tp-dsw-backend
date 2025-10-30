import { Injectable } from '@nestjs/common';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { QueryRunner } from 'typeorm';
import { City } from '../cities.entity';
import { CitiesRepository } from '../repository/cities.repository';
@Injectable()
export class CitiesService {
  constructor(private readonly cityRepository: CitiesRepository) {}

  async search(page: number, results: number, filters?: Partial<City>, global?: string): Promise<IPaginated<City>> {
    return this.cityRepository.search(page, results, filters, global);
  }

  async findAll(queryRunner?: QueryRunner) {
    return this.cityRepository.findAll(queryRunner);
  }
  async findOne(id: number, queryRunner?: QueryRunner) {
    return this.cityRepository.findById(id, queryRunner);
  }

  async findByCountryId(countryId: number) {
    return this.cityRepository.findByCountryId(countryId);
  }
}
