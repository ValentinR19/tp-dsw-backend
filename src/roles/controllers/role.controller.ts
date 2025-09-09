import { Role } from '@main-module/roles/models/classes/role.entity';
import { CreateRoleDTO } from '@main-module/roles/models/dtos/create-role.dto';
import { RoleService } from '@main-module/roles/services/role.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Controller()
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('page/:pageNumber')
  async search(@Param() { pageNumber }: PageParamDTO, @Query() dto: PaginatedQueryDTO<Role>): Promise<IPaginated<Role>> {
    return this.roleService.search(pageNumber, dto);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateRoleDTO): Promise<Role> {
    return this.roleService.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRoleDTO): Promise<Role> {
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.roleService.softDelete(id);
  }
}
