import { HttpStatus, Logger } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotSavedErrorException extends BaseException {
  constructor(entidad: string, stacktrace?: Error) {
    Logger.error(`La entidad ${entidad} solicitada no ha podido ser guardada en la base de datos.`, stacktrace, `${entidad}Module`);
    super(`La entidad ${entidad} no ha podido ser guardada.`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
