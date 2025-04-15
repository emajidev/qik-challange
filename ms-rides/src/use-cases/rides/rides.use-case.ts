import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRideDTO, UpdateRideDTO, FilterRidesDto } from 'src/core/dtos/rides/rides.dto';
import { Types } from 'mongoose';
import { RidesMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/rides.repository';
import { EStatusRide } from 'src/core/enums';
import { IRide } from 'src/core/interfaces/rides/rides.interface';
import { PageDto } from 'src/core';
import { HttpStatusCode } from 'axios';
import { FilterPaginationQuery } from 'src/core/dtos/pagination/paginateRequest.dto';

@Injectable()
export class RideUseCases {
  constructor(private readonly ridesRepository: RidesMongoRepository) { }

  async createRide(createRideDTO: CreateRideDTO) {

    const findRides = await this.ridesRepository.findOne({
      $or: [
        { passanger_id: createRideDTO?.passanger_id },
        { driver_id: createRideDTO?.driver_id, }],
      status: { $in: [EStatusRide.pending, EStatusRide.in_progress] }
    })
    if (findRides) {
      throw new HttpException("driver_id or passanger_id already has an active ride(pending or in progress", HttpStatusCode.BadRequest)
    }


    const ride: IRide = {
      _id: new Types.ObjectId(),
      ...createRideDTO,
      status: EStatusRide.pending,
      pickup_location: {
        ...createRideDTO.pickup_location,
        type: 'Point'
      },
      dropoff_location: {
        ...createRideDTO.dropoff_location,
        type: 'Point'
      }
    };
    return this.ridesRepository.create(ride);
  }


  async getActiveRides(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IRide>> {
    optionsPaginate.filter = {
      status: { $in: [EStatusRide.pending, EStatusRide.in_progress] },
    }
    return this.ridesRepository.findPaginate(optionsPaginate);
  }

  async getRideById(id: string) {
    const ride = await this.ridesRepository.findById(id);
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }
    return ride;
  }

  async updateRide(id: string, updateRideDTO: UpdateRideDTO) {
    const ride = await this.getRideById(id);
    if (!ride) {
      throw new HttpException('Ride not found', HttpStatusCode.NotFound,)
    }
    return this.ridesRepository.findByIdAndUpdate(id, updateRideDTO);
  }

  async startRide(id: string) {
    const ride = await this.getRideById(id);
    if (ride.status !== EStatusRide.pending) {
      throw new HttpException('Ride can only be started when pending', HttpStatusCode.Forbidden,)
    }
    return this.ridesRepository.findByIdAndUpdate(id, {
      status: EStatusRide.in_progress,
      started_at: new Date(),
    });
  }

  async completeRide(id: string) {
    const ride = await this.getRideById(id);
    if (ride.status !== EStatusRide.in_progress) {
      throw new HttpException('Ride can only be completed when in progress', HttpStatusCode.Forbidden,)
    }
    return this.ridesRepository.findByIdAndUpdate(id, {
      status: EStatusRide.completed,
      completed_at: new Date(),
    });
  }

  async cancelRide(id: string) {
    const ride = await this.getRideById(id);
    if (ride.status === EStatusRide.completed) {
      throw new HttpException('Cannot cancel a completed ride', HttpStatusCode.Forbidden,)
    }
    return this.ridesRepository.findByIdAndUpdate(id, {
      status: EStatusRide.cancelled,
    });
  }

} 