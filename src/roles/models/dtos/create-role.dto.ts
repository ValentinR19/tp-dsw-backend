import { Role } from '@main-module/roles/models/classes/role.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO extends Role {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ValidateNested({ each: true })
  // @Type(() => RolePermissionDTO)
  // @IsArray()
  // permissions: RolePermissionDTO[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => InformeDTO)
  // informes: InformeDTO[];
}
