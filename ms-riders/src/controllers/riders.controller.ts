import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RidersPaginatedResponseDto, FindByIdDTO, IRiders, PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation } from 'src/core/dtos/pagination/paginateRequest.dto';
import { RidersUseCases } from 'src/use-cases/riders/riders.use-case';

@ApiTags('riders')
@Controller('riders')
export class ridersController {
  constructor(private ridersUseCases: RidersUseCases) { }

  @Get()
  @ApiOkResponse({ type: RidersPaginatedResponseDto})
  async getAllPaginate(
    @Query() filter: FilterPaginationQuery
  ): Promise<PageDto<IRiders>> {
    return this.ridersUseCases.getAllriders(filter)
  }

  @Get('/available')
  @ApiOkResponse({ type: RidersPaginatedResponseDto})
  async getAllAvailablePaginate(
    @Query() paginateOptions: FilterPaginationQuery
  ): Promise<PageDto<IRiders>> {
    return this.ridersUseCases.getAllridersAvailable(paginateOptions)
  }

  @Get('/available/distance')
  @ApiOkResponse({ type: RidersPaginatedResponseDto})
  
  async getAllAvailableByDistance(
    @Query() filter: FilterPaginationQueryLocation
  ): Promise<PageDto<IRiders>> {
    return this.ridersUseCases.getAllridersAvailableByDistance(filter)
  }


  @Get(':id')
  async getById(@Param() filter: FindByIdDTO) {
    return this.ridersUseCases.getRidersById(filter?.id);
  }
}
