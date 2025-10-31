import { Country } from '@main-module/locations/models/classes/country.entity';
import { CountryService } from '@main-module/locations/services/country.service';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Controller('countries')
@UseGuards(JwtAuthGuard)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/all')
  async getAll(): Promise<Country[]> {
    return this.countryService.getAll();
  }

  @Get('page/:pageNumber')
  async search(@Param() { pageNumber }: PageParamDTO, @Query() dto: PaginatedQueryDTO<Country>): Promise<IPaginated<Country>> {
    return this.countryService.search(pageNumber, dto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Country> {
    return this.countryService.findById(id);
  }
}
