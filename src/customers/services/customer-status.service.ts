import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { CustomerStatusRepository } from '@customers-module/repositories/customer-status.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerStatusService {
  constructor(private readonly repository: CustomerStatusRepository) {}

  /* 
  En el caso de los estados, solo haremos un findAll no el crud completo
  Ya que se va a cargar directamente desde la db.
  Necesitaremos el FindAll para el formulario de creación de clientes
  */
  async findAll(): Promise<CustomerStatus[]> {
    return this.repository.findAll();
  }
}
