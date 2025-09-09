import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InformeRepository {
  constructor(@InjectRepository(Informe) private readonly repository: Repository<Informe>) {}

  async findAll(): Promise<Informe[]> {
    return this.repository.find({
      select: {
        id: true,
        description: true,
        tipoInforme: {
          id: true,
          description: true,
        },
      },
      relations: {
        tipoInforme: true,
      },
    });
  }
}
