import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation, FilterPaginationQueryLocationAggregate } from 'src/core/dtos/pagination/paginateRequest.dto';
import { IPassangers } from 'src/core/interfaces/passangers/passangers.interface';
import { passangersMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/passangers.repository';

@Injectable()
export class PassangersUseCases {
  constructor(
    readonly passangersRepository: passangersMongoRepository,
  ) { }

  getAllpassangers(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IPassangers>> {
    return this.passangersRepository.findPaginate(optionsPaginate);
  }

  getAllpassangersAvailable(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IPassangers>> {
    optionsPaginate.filter = { available: true }
    return this.passangersRepository.findPaginate(optionsPaginate);
  }

  async getAllpassangersAvailableNear(optionsPaginate: FilterPaginationQueryLocationAggregate): Promise<PageDto<IPassangers>> {

    optionsPaginate.filter = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [optionsPaginate.longitud, optionsPaginate.latitud]
          },
          distanceField: "calculatedDistance",
          spherical: true,
          minDistance: 0,
          query: { available: true }
        }
      },
      {
        $addFields: {
          distanceInKm: {
            $divide: ["$calculatedDistance", 1000]
          } // Convertir a km
        }
      },
      { $sort: { calculatedDistance: 1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          name: 1,
          vehicle: 1,
          distance: "$distanceInKm",
          location: 1
        }
      }
    ]

    const result = await this.passangersRepository.findPaginateAggregate(optionsPaginate);

    return result
  }

  getPassangersById(id: string): Promise<IPassangers | null> {
    return this.passangersRepository.findById(id);
  }


}
