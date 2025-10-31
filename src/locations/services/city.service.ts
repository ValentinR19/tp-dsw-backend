import { City } from '@main-module/locations/models/classes/city.entity';
import { CityRepository } from '@main-module/locations/repository/city.repository';
import { Injectable, Logger } from '@nestjs/common';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);

  constructor(private readonly cityRepository: CityRepository) {}

  async search(page: number, stateId: number, dto: PaginatedQueryDTO<City>): Promise<IPaginated<City>> {
    let { results, global, filters } = dto;
    if (typeof filters === 'string') {
      filters = JSON.parse(filters);
    }
    this.logger.log(`Searching cities with filters: ${JSON.stringify(filters)}`);
    return this.cityRepository.search(page, results, stateId, global, filters);
  }
}
