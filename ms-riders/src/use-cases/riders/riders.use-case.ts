import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation } from 'src/core/dtos/pagination/paginateRequest.dto';
import { IRiders } from 'src/core/interfaces/riders/riders.interface';
import { ridersMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/riders.repository';

@Injectable()
export class RidersUseCases {
  constructor(
    readonly ridersRepository: ridersMongoRepository,
  ) { }

  getAllriders(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IRiders>> {
    return this.ridersRepository.findPaginate(optionsPaginate);
  }

  getAllridersAvailable(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IRiders>> {
    optionsPaginate.filter = { available: true }
    return this.ridersRepository.findPaginate(optionsPaginate);
  }

  async getAllridersAvailableByDistance(optionsPaginate: FilterPaginationQueryLocation): Promise<PageDto<IRiders>> {

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

    const result = await this.ridersRepository.findPaginate(optionsPaginate);

    return result
  }

  getRidersById(id: string): Promise<IRiders | null> {
    return this.ridersRepository.findById(id);
  }


}
