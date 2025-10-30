import { Injectable } from '@nestjs/common';
import { StatesRepository } from '../repository/states.repository';

@Injectable()
export class StatesService {
  constructor(private readonly stateRepository: StatesRepository) {}

  async findByCountry(countryId: number) {
    return this.stateRepository.findByCountryId(countryId);
  }
}
