import { InformeDTO } from '@main-module/permission/informes/models/dtos/informe.dto';
import { Role } from '@main-module/roles/models/classes/role.entity';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateRoleDTO extends Role {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InformeDTO)
  informes: InformeDTO[];
}
