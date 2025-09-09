import { CreateRoleDTO } from '@main-module/roles/models/dtos/create-role.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {}
