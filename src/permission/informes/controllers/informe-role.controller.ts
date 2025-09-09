import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { IMenuItem } from '@main-module/permission/informes/models/interafaces/menu-item.interface';
import { InformeRoleService } from '@main-module/permission/informes/services/informe-role.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoggedUser } from '@shared-module/decorators/logged-user.decorator';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';

@Controller('informes')
@UseGuards(JwtAuthGuard)
export class InformeRoleController {
  constructor(private readonly informeRoleservice: InformeRoleService) {}

  @Get('for-menu')
  async getUserMenu(@LoggedUser() userPayload: IUserPayload): Promise<IMenuItem[]> {
    return this.informeRoleservice.buildRoleMenu(userPayload.id);
  }

  @Get('all')
  async findAll(): Promise<Informe[]> {
    return this.informeRoleservice.findAll();
  }
}
