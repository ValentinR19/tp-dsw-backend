import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatesService } from '../services/states.service';
import { State } from '../states.entity';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StatesService) {}

  @Get(':countryId')
  findAll(@Param('countryId', ParseIntPipe) countryId: number): Promise<State[]> {
    return this.stateService.findByCountry(countryId);
  }
}
