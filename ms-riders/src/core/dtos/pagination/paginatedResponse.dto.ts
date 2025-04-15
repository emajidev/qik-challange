// src/core/dtos/riders.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

/* ------------------------- */
/*      ENUMS                */
/* ------------------------- */

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

/* ------------------------- */
/*   DTOs PAGINATION         */
/* ------------------------- */

export class PaginationDto {
    @ApiPropertyOptional({
        description: 'Sort order (ASC or DESC)',
        enum: SortOrder,
        default: SortOrder.ASC,
    })
    @IsOptional()
    @IsIn(Object.values(SortOrder))
    @Type(() => String)
    sort?: SortOrder;

    @ApiPropertyOptional({
        description: 'Page number (1-based)',
        minimum: 1,
        default: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100,
        default: 10,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
}

export class MetaDto {
    @ApiProperty({ example: 20, description: 'Total de páginas disponibles' })
    total_pages: number;

    @ApiProperty({ example: 20, description: 'Total de elementos' })
    total_elements: number;

    @ApiProperty({ example: '1', description: 'Página actual' })
    page_number: string;

    @ApiProperty({ example: 1, description: 'Elementos por página' })
    page_size: number;
}

export class LinksDto {
    @ApiProperty({ example: 'query?page=1', description: 'URL actual' })
    self: string;

    @ApiProperty({ example: 'query?page=1', description: 'Primera página' })
    first: string;

    @ApiProperty({ example: 'query?page=1', description: 'Página anterior' })
    prev: string;

    @ApiProperty({ example: 'query?page=11', description: 'Página siguiente' })
    next: string;

    @ApiProperty({ example: 'query?page=20', description: 'Última página' })
    last: string;
}
export function createPaginatedResponseDto<T>(type: new () => T) {
    class PaginatedResponseDto {
      @ApiProperty({
        type: [type],
        description: 'Array de items paginados'
      })
      data: T[];
  
      @ApiProperty({ type: MetaDto, description: 'Metadatos de paginación' })
      _meta: MetaDto;
  
      @ApiProperty({ type: LinksDto, description: 'Enlaces de navegación' })
      _links: LinksDto;
    }
  
    return PaginatedResponseDto;
  }
  
