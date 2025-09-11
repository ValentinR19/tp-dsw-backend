import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@users-module/models/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
