import { State } from '@main-module/locations/models/classes/state.entity';
import { StateRepository } from '@main-module/locations/repository/state.repository';
import { Injectable, Logger } from '@nestjs/common';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Injectable()
export class StateService {
  private readonly logger = new Logger(StateService.name);

  constructor(private readonly stateRepository: StateRepository) {}

  async search(page: number, countryId: number, dto: PaginatedQueryDTO<State>): Promise<IPaginated<State>> {
    let { results, global, filters } = dto;
    if (typeof filters === 'string') {
      filters = JSON.parse(filters);
    }
    //this.logger.log(`Searching states with filters: ${JSON.stringify(filters)}`);
    return this.stateRepository.search(page, results, countryId, global, filters);
  }
}
