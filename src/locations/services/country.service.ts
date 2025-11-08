import { Country } from '@main-module/locations/models/classes/country.entity';
import { CountryRepository } from '@main-module/locations/repository/country.repository';
import { Injectable, Logger } from '@nestjs/common';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(private readonly countryRepository: CountryRepository) {}

  async search(page: number, dto: PaginatedQueryDTO<Country>): Promise<IPaginated<Country>> {
    let { results, global, filters } = dto;
    if (typeof filters === 'string') {
      filters = JSON.parse(filters);
    }
    //this.logger.log(`Searching countries with filters: ${JSON.stringify(filters)}`);
    const countries = await this.countryRepository.search(page, results, global, filters);
    //this.logger.log(`Country search finished successfully`);
    return countries;
  }

  async findById(id: number): Promise<Country> {
    try {
      //this.logger.log(`Searching country with id: ${id}`);
      const country = await this.countryRepository.findById(id);
      //this.logger.log(`Country search finished successfully`);
      return country;
    } catch (error) {
      throw new NotFoundErrorException(Country.name, error);
    }
  }

  async getAll(): Promise<Country[]> {
    //this.logger.log(`Getting all countries`);
    const countries = await this.countryRepository.getAll();
    //this.logger.log(`Countries retrieved successfully`);
    return countries;
  }
}
