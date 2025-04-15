import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DriverPaginatedResponseDto, FindByIdDTO, IDriver, PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation } from 'src/core/dtos/pagination/paginateRequest.dto';
import { DriverUseCases } from 'src/use-cases/drivers/drivers.use-case';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private driverUseCases: DriverUseCases) { }

  @Get()
  @ApiOkResponse({ type: DriverPaginatedResponseDto})
  async getAllPaginate(
    @Query() filter: FilterPaginationQuery
  ): Promise<PageDto<IDriver>> {
    return this.driverUseCases.getAllDrivers(filter)
  }

  @Get('/available')
  @ApiOkResponse({ type: DriverPaginatedResponseDto})
  async getAllAvailablePaginate(
    @Query() paginateOptions: FilterPaginationQuery
  ): Promise<PageDto<IDriver>> {
    return this.driverUseCases.getAllDriversAvailable(paginateOptions)
  }

  @Get('/available/distance')
  @ApiOkResponse({ type: DriverPaginatedResponseDto})
  
  async getAllAvailableByDistance(
    @Query() filter: FilterPaginationQueryLocation
  ): Promise<PageDto<IDriver>> {
    return this.driverUseCases.getAllDriversAvailableByDistance(filter)
  }


  @Get(':id')
  async getById(@Param() filter: FindByIdDTO) {
    return this.driverUseCases.getDriverById(filter?.id);
  }
}
