import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {City} from '../cities.entity'
@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly citiesRepo: Repository<City>,
  ) {}

  // Ciudades por provincia/estado
  async findByState(stateId: number) {
    return this.citiesRepo.find({
      where: { idState: stateId },
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });
  }

  // (Opcional) Búsqueda por nombre dentro de un país
  async searchByNameInCountry(q: string, countryId: number, limit = 20) {
    return this.citiesRepo.find({
      where: { country: { id: countryId }, name: ILike(`%${q}%`) },
      select: { id: true, name: true },
      order: { name: 'ASC' },
      take: limit,
    });
  }
}
