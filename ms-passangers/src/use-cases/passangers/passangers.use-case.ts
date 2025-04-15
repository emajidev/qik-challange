import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation } from 'src/core/dtos/pagination/paginateRequest.dto';
import { IPassangers } from 'src/core/interfaces/passangers/passangers.interface';
import { DriversMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/drivers.repository';
import { PassangersMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/passangers.repository';

@Injectable()
export class PassangersUseCases {
  constructor(
    readonly passangersRepository: PassangersMongoRepository,
    readonly driversRepository: DriversMongoRepository
  ) { }

  getAllpassangers(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IPassangers>> {
    return this.passangersRepository.findPaginate(optionsPaginate);
  }

  getAllpassangersAvailable(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IPassangers>> {
    optionsPaginate.filter = { available: true }
    return this.passangersRepository.findPaginate(optionsPaginate);
  }

  getAllpassangersAvailableNear(optionsPaginate: FilterPaginationQueryLocation): Promise<PageDto<IPassangers>> {
    optionsPaginate.filter = {
      available: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [optionsPaginate.longitud, optionsPaginate.latitud]
          },
          $maxDistance: 10000 // 10km in meters
        }
      }
    };

    optionsPaginate.limit = 3;
    return this.driversRepository.findPaginate(optionsPaginate);
  }

  getPassangersById(id: string): Promise<IPassangers | null> {
    return this.passangersRepository.findById(id);
  }


}
