import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { FilterPaginationQuery } from './paginateRequest.dto';


export class PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit: number = 10;

  constructor(filter: FilterPaginationQuery);
  constructor(page?: number, limit?: number);
  constructor(filterOrPage?: unknown, limit?: number) {
    this.page = 1;
    this.limit = 10;
    if (typeof filterOrPage === 'number') {
      this.page = (filterOrPage as number) || this.page;
      this.limit = limit || this.limit;
    } else if ((filterOrPage as FilterPaginationQuery).page) {
      this.page = (filterOrPage as FilterPaginationQuery).page || this.page;
      this.limit = (filterOrPage as FilterPaginationQuery).limit || this.limit;
    }
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
