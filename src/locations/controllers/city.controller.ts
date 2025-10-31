import { City } from '@main-module/locations/models/classes/city.entity';
import { CityService } from '@main-module/locations/services/city.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { GroupFiltersPipe } from '@shared-module/pipes/group-filter.pipe';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('page/:pageNumber')
  async search(@Param() { pageNumber }: PageParamDTO, @Query(GroupFiltersPipe) dto: PaginatedQueryDTO<City>): Promise<IPaginated<City>> {
    return this.cityService.search(Number(pageNumber), dto);
  }
}
