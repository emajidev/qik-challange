import { Controller, Get, Post, Patch, Body, Param, Query, Put, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RideUseCases } from 'src/use-cases/rides/rides.use-case';
import { CreateRideDTO, UpdateRideDTO, FindByIdDTO } from 'src/core/dtos/rides/rides.dto';
import { FilterPaginationQuery } from 'src/core/dtos/pagination/paginateRequest.dto';

@ApiTags('Rides')
@Controller('rides')
export class RidesController {
  constructor(private readonly rideUseCases: RideUseCases) {
    if (!this.rideUseCases) {
      throw new Error('RideUseCases must be provided');
    }
  }
  @Post()
  @ApiOperation({ summary: 'Create a new ride' })
  @ApiResponse({ status: 201, description: 'Ride created successfully' })
  async createRide(@Body() createRideDTO: CreateRideDTO) {
    return this.rideUseCases.createRide(createRideDTO);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active rides' })
  @ApiResponse({ status: 200, description: 'Returns active rides' })
  async getActiveRides(@Query() paginateOptions: FilterPaginationQuery
  ) {
    return this.rideUseCases.getActiveRides(paginateOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ride by ID' })
  @ApiResponse({ status: 200, description: 'Returns a specific ride' })
  async getRideById(@Param() param: FindByIdDTO) {
    return this.rideUseCases.getRideById(param?.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ride' })
  @ApiResponse({ status: 200, description: 'Ride updated successfully' })
  async updateRide(@Param('id') id: string, @Body() updateRideDTO: UpdateRideDTO) {
    return this.rideUseCases.updateRide(id, updateRideDTO);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Start a ride' })
  @ApiResponse({ status: 200, description: 'Ride started successfully' })
  async startRide(@Param('id') id: string) {
    return this.rideUseCases.startRide(id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a ride' })
  @ApiResponse({ status: 200, description: 'Ride completed successfully' })
  async completeRide(@Param('id') id: string) {
    return this.rideUseCases.completeRide(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a ride' })
  @ApiResponse({ status: 200, description: 'Ride cancelled successfully' })
  async cancelRide(@Param('id') id: string) {
    return this.rideUseCases.cancelRide(id);
  }

} 