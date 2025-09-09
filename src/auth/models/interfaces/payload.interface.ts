import { Role } from '@main-module/roles/models/classes/role.entity';

export interface IUserPayload {
  id: number;
  username: string;
  fullName: string;
  iss: string;
  roles: Role[];
}
