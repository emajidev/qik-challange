import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "./base-response-ok.entity";


export class HealthResponse extends BaseResponse {
    @ApiProperty()
    data = []
}