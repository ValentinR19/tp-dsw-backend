import { TipoInforme } from '@main-module/permission/informes/models/classes/tipo-informe.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoInformeRepository {
  constructor(@InjectRepository(TipoInforme) private readonly repository: Repository<TipoInforme>) {}

  async findForRole(roleId: number): Promise<TipoInforme[]> {
    return this.repository.find({
      select: {
        id: true,
        description: true,
        icon: true,
        order: true,
        url: true,
        informes: {
          id: true,
          description: true,
          icon: true,
          url: true,
        },
      },
      where: {
        informes: {
          roles: {
            id: roleId,
          },
        },
      },
      relations: {
        informes: {
          roles: true,
        },
      },
    });
  }
}
