import { City } from '@main-module/locations/models/classes/city.entity';
import { CityService } from '@main-module/locations/services/city.service';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { GroupFiltersPipe } from '@shared-module/pipes/group-filter.pipe';

@Controller('cities')
@UseGuards(JwtAuthGuard)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':stateId/page/:pageNumber')
  async search(
    @Param() { pageNumber }: PageParamDTO,
    @Param('stateId', ParseIntPipe) stateId: number,
    @Query(GroupFiltersPipe) dto: PaginatedQueryDTO<City>,
  ): Promise<IPaginated<City>> {
    return this.cityService.search(Number(pageNumber), stateId, dto);
  }
}
