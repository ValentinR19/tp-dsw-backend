import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../states.entity';
import { City } from '../cities.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State) private readonly statesRepo: Repository<State>,
    @InjectRepository(City) private readonly citiesRepo: Repository<City>,
  ) {}

  async findOne(stateId: number) {
    const st = await this.statesRepo.findOne({
      where: { id: stateId },
      select: { id: true, name: true, idCountry: true },
    });
    if (!st) throw new NotFoundException('State not found');
    return st;
  }

  async findByCountry(countryId: number) {
    return this.statesRepo.find({
      where: { idCountry: countryId },
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });
  }

  // Ciudades por provincia/estado
  async findCities(stateId: number) {
    return this.citiesRepo.find({
      where: { idState: stateId }, // columna mapeada como state_id
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });
  }
}
