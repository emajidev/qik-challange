import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core';
import { IDriver } from 'src/core/interfaces/drivers/drivers.interface';
import { FilterPaginationQuery } from 'src/infrastructure/data-services/mongo/http/middleware/req-filterpaginate.middleware';
import { DriversMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/drivers.repository';

@Injectable()
export class DriverUseCases {
  constructor(
    readonly driverRepository: DriversMongoRepository,
  ) {}

  getAllDrivers(filter: FilterPaginationQuery): Promise<PageDto<IDriver>> {
    return this.driverRepository.findPaginate(filter);
  }

  getDriverById(id: any): Promise<IDriver | null> {
    return this.driverRepository.findById(id);
  }

  
}
