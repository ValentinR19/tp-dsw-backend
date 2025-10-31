import { State } from '@main-module/locations/models/classes/state.entity';
import { StateService } from '@main-module/locations/services/state.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { GroupFiltersPipe } from '@shared-module/pipes/group-filter.pipe';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('page/:pageNumber')
  async search(@Param() { pageNumber }: PageParamDTO, @Query(GroupFiltersPipe) dto: PaginatedQueryDTO<State>): Promise<IPaginated<State>> {
    return this.stateService.search(pageNumber, dto);
  }
}
