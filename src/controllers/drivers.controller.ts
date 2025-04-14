import { Controller, Get, Param } from '@nestjs/common';
import { FilterPaginate } from 'src/infrastructure/data-services/mongo/http/decoractors/req-filterpaginate.decorator';
import { FilterPaginationQuery } from 'src/infrastructure/data-services/mongo/http/middleware/req-filterpaginate.middleware';
import { DriverUseCases } from 'src/use-cases/drivers/drivers.use-case';


@Controller('drivers')
export class DriversController {
  constructor(private driverUseCases: DriverUseCases) { }

  @Get()
  async getAllPaginate(
    @FilterPaginate() filter: FilterPaginationQuery
  ) {
    return this.driverUseCases.getAllDrivers(filter);
  }

  @Get(':id')
  async getById(@Param('id') id: any) {
    return this.driverUseCases.getDriverById(id);
  }
}
