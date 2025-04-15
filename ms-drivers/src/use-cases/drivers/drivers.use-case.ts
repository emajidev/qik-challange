import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation } from 'src/core/dtos/pagination/paginateRequest.dto';
import { IDriver } from 'src/core/interfaces/drivers/drivers.interface';
import { DriversMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/drivers.repository';

@Injectable()
export class DriverUseCases {
  constructor(
    readonly driverRepository: DriversMongoRepository,
  ) { }

  getAllDrivers(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IDriver>> {
    return this.driverRepository.findPaginate(optionsPaginate);
  }

  getAllDriversAvailable(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IDriver>> {
    optionsPaginate.filter = { available: true }
    return this.driverRepository.findPaginate(optionsPaginate);
  }

  async getAllDriversAvailableByDistance(optionsPaginate: FilterPaginationQueryLocation): Promise<PageDto<IDriver>> {

    optionsPaginate.filter = {
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [Number(optionsPaginate.longitud), Number(optionsPaginate.latitud)]
          },
          $minDistance: 100,
          $maxDistance: optionsPaginate.distance
        }
      },
      available: true
    }

    const result = await this.driverRepository.findPaginate(optionsPaginate);

    return result
  }

  getDriverById(id: string): Promise<IDriver | null> {
    return this.driverRepository.findById(id);
  }


}
