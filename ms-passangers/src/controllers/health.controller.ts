import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { BaseResponseException } from "src/core/entities/base-response-ok.entity";
import { HealthResponse } from "src/core/entities/health-response.entity";

@Controller('health')
export class HealthController {
    constructor() { }
    
    @Get()
    @ApiResponse({ status: 200, type: HealthResponse })
    @ApiResponse({ status: 500, type: BaseResponseException })
    retrieve() {
        return new HealthResponse();
    }
}