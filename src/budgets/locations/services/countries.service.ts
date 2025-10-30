import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../countries.entity';
import { State } from '../states.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private readonly countriesRepo: Repository<Country>,
    @InjectRepository(State) private readonly statesRepo: Repository<State>,
  ) {}

  // Lista de países (campos livianos)
  async findAll() {
    return this.countriesRepo.find({
      select: { id: true, name: true, iso3: true },
      order: { name: 'ASC' },
    });
  }

  // Provincias/estados por país
  async findStates(countryId: number) {
    return this.statesRepo.find({
      where: { idCountry: countryId }, // columna mapeada como country_id
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });
  }
}