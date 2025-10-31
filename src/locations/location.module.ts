import { CityController } from '@main-module/locations/controllers/city.controller';
import { CountryController } from '@main-module/locations/controllers/country.controller';
import { StateController } from '@main-module/locations/controllers/state.controller';
import { City } from '@main-module/locations/models/classes/city.entity';
import { Country } from '@main-module/locations/models/classes/country.entity';
import { Region } from '@main-module/locations/models/classes/region.entity';
import { State } from '@main-module/locations/models/classes/state.entity';
import { Subregion } from '@main-module/locations/models/classes/subregion.entity';
import { CityRepository } from '@main-module/locations/repository/city.repository';
import { CountryRepository } from '@main-module/locations/repository/country.repository';
import { StateRepository } from '@main-module/locations/repository/state.repository';
import { CityService } from '@main-module/locations/services/city.service';
import { CountryService } from '@main-module/locations/services/country.service';
import { StateService } from '@main-module/locations/services/state.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country, State, Region, Subregion])],
  controllers: [CityController, StateController, CountryController],
  providers: [CountryService, CountryRepository, StateService, StateRepository, CityService, CityRepository],
  exports: [],
})
export class LocationModule {}
