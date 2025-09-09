import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { TipoInforme } from '@main-module/permission/informes/models/classes/tipo-informe.entity';
import { IMenuItem } from '@main-module/permission/informes/models/interafaces/menu-item.interface';
import { InformeRepository } from '@main-module/permission/informes/repositories/informe.repository';
import { TipoInformeService } from '@main-module/permission/informes/services/tipo-informe.service';
import { RoleService } from '@main-module/roles/services/role.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InformeRoleService {
  constructor(
    private readonly tipoInformeService: TipoInformeService,
    private readonly InformeRepository: InformeRepository,
    private readonly roleService: RoleService,
  ) {}

  async findAll(): Promise<Informe[]> {
    return this.InformeRepository.findAll();
  }

  async buildRoleMenu(userId: number): Promise<IMenuItem[]> {
    const roles = await this.roleService.findRolesByUserID(userId);

    const tipoInformesPerRole = await Promise.all(roles.map((role) => this.tipoInformeService.findForRole(role.id)));

    const tipoInformes = tipoInformesPerRole.flat();
    const uniqueTipoInformes = tipoInformes
      .reduce((acc: TipoInforme[], current: TipoInforme) => {
        if (!acc.some((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, [] as TipoInforme[])
      .sort((a: TipoInforme, b: TipoInforme) => a.order - b.order);
    const menu: IMenuItem[] = [
      {
        id: '0',
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: '/dashboard',
      },
    ];
    menu.push(
      ...uniqueTipoInformes
        .map((tipoInforme: TipoInforme) => {
          tipoInforme.informes = tipoInforme.informes?.filter((informe) => informe.roles?.some((role) => roles.some((userRole) => userRole.id === role.id)));

          return tipoInforme;
        })
        .filter((tipoInforme: TipoInforme) => tipoInforme.informes?.length > 0)
        .map((tipoInforme: TipoInforme) => {
          const mainItem: IMenuItem = {
            id: tipoInforme.id.toString(),
            label: tipoInforme.description,
            icon: tipoInforme.icon,
            routerLink: tipoInforme.url,
            items: tipoInforme.informes?.map((informe: Informe) => {
              const subItem: IMenuItem = {
                id: informe.id.toString(),
                label: informe.description,
                icon: informe.icon,
                routerLink: informe.url,
              };
              return subItem;
            }),
          };
          return mainItem;
        }),
    );

    return menu;
  }
}
