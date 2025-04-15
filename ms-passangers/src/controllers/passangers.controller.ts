import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PassangersPaginatedResponseDto, FindByIdDTO, IPassangers, PageDto } from 'src/core';
import { FilterPaginationQuery, FilterPaginationQueryLocation } from 'src/core/dtos/pagination/paginateRequest.dto';
import { PassangersUseCases } from 'src/use-cases/passangers/passangers.use-case';

@ApiTags('passangers')
@Controller('passangers')
export class passangersController {
  constructor(private passangersUseCases: PassangersUseCases) { }

  @Get()
  @ApiOkResponse({ type: PassangersPaginatedResponseDto})
  async getAllPaginate(
    @Query() filter: FilterPaginationQuery
  ): Promise<PageDto<IPassangers>> {
    return this.passangersUseCases.getAllpassangers(filter)
  }

  @Get('/available')
  @ApiOkResponse({ type: PassangersPaginatedResponseDto})
  async getAllAvailablePaginate(
    @Query() paginateOptions: FilterPaginationQuery
  ): Promise<PageDto<IPassangers>> {
    return this.passangersUseCases.getAllpassangersAvailable(paginateOptions)
  }

  @Get('/available/near')
  @ApiOkResponse({ type: PassangersPaginatedResponseDto})
  
  async getAllpassangersAvailableNear(
    @Query() filter: FilterPaginationQueryLocation
  ): Promise<PageDto<IPassangers>> {
    return this.passangersUseCases.getAllpassangersAvailableNear(filter)
  }


  @Get(':id')
  async getById(@Param() filter: FindByIdDTO) {
    return this.passangersUseCases.getPassangersById(filter?.id);
  }
}
