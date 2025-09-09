import { TipoInforme } from '@main-module/permission/informes/models/classes/tipo-informe.entity';
import { TipoInformeRepository } from '@main-module/permission/informes/repositories/tipo-informe.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TipoInformeService {
  constructor(private readonly tipoInformeRepository: TipoInformeRepository) {}

  async findForRole(roleId: number): Promise<TipoInforme[]> {
    return this.tipoInformeRepository.findForRole(roleId);
  }
}
