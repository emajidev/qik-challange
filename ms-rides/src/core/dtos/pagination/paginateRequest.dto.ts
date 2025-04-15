import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";
import { SortOrder } from "mongoose";

export type FilterPaginationQueryOptions = {
    filter?: any
    orderBy: string
    sortBy: string;
    page: number;
    limit: number;
};

export type sorOrder =
    | { [key: string]: SortOrder | { $meta: 'textScore' } }
    | string;

export class FilterPagination {
    @ApiPropertyOptional({
        description: 'Sort order field',
    })
    sortBy: string;
    @ApiPropertyOptional({
        description: 'Order Asc or Desc',
    })
    orderBy: string;
    @ApiPropertyOptional({
        description: 'Page pagination',
        minimum: 1,
        default: 1,
    })
    page: number;
    @ApiPropertyOptional({
        description: 'Limit pagination',
        minimum: 1,
        maximum: 100,
    })
    limit: number;

    constructor(filter: FilterPaginationQueryOptions) {
        this.sortBy = filter?.sortBy
        this.orderBy = filter?.orderBy
        this.page = filter?.page;
        this.limit = filter?.limit;
    }

    get skip(): number {
        return (this.page - 1) * this.limit;
    }

}


export class FilterPaginationQuery extends FilterPagination {
    @ApiHideProperty()
    filter: {};
    constructor(filter: FilterPaginationQueryOptions) {
        super(filter);
        this.filter = filter?.filter
    }
}


export class FilterPaginationQueryLocation extends FilterPagination {
    @ApiHideProperty()
    filter: {};
    @ApiProperty()
    @IsNumberString()
    longitud: number

    @ApiProperty()
    @IsNumberString()
    latitud: number

    @ApiProperty({
        description: 'Search in distance range (KM)',
        minimum: 100,
        default: 3000,
    })
    @IsNumberString()
    distance: number
    constructor(filter: FilterPaginationQueryOptions) {
        super(filter);
        this.filter = filter?.filter
    }
}