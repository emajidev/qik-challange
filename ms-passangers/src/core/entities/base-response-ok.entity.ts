import { ApiProperty } from "@nestjs/swagger";

export class BaseResponse {
    @ApiProperty()
    statusCode?: number = 200;

    @ApiProperty()
    message?: string = "OK";

    @ApiProperty()
    data: any[];
}

class BasePagination {
    @ApiProperty()
    page: number;

    @ApiProperty()
    per_page: number;

    @ApiProperty()
    total: number;
}

export class BaseResponsePaginated extends BaseResponse {
    @ApiProperty()
    pagination: BasePagination
}

export class BaseResponseException {
    @ApiProperty()
    statusCode?: number;

    @ApiProperty()
    message?: string;

    @ApiProperty()
    codeError: string | null;

    @ApiProperty()
    details: string | null;
}