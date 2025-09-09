import { InformeRoleController } from '@main-module/permission/informes/controllers/informe-role.controller';
import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { TipoInforme } from '@main-module/permission/informes/models/classes/tipo-informe.entity';
import { InformeRepository } from '@main-module/permission/informes/repositories/informe.repository';
import { TipoInformeRepository } from '@main-module/permission/informes/repositories/tipo-informe.repository';
import { InformeRoleService } from '@main-module/permission/informes/services/informe-role.service';
import { TipoInformeService } from '@main-module/permission/informes/services/tipo-informe.service';
import { RolesModule } from '@main-module/roles/roles.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Informe, TipoInforme]), RolesModule],
  controllers: [InformeRoleController],
  providers: [InformeRepository, InformeRoleService, TipoInformeRepository, TipoInformeService],
  exports: [],
})
export class PermissionModule {}
