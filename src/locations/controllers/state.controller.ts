import { State } from '@main-module/locations/models/classes/state.entity';
import { StateService } from '@main-module/locations/services/state.service';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { GroupFiltersPipe } from '@shared-module/pipes/group-filter.pipe';

@Controller('states')
@UseGuards(JwtAuthGuard)
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':countryId/page/:pageNumber')
  async search(
    @Param() { pageNumber }: PageParamDTO,
    @Param('countryId', ParseIntPipe) countryId: number,
    @Query(GroupFiltersPipe) dto: PaginatedQueryDTO<State>,
  ): Promise<IPaginated<State>> {
    return this.stateService.search(pageNumber, countryId, dto);
  }
}
