import { Controller, Get, Post, Patch, Body, Param, Query, Put, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoicesUseCases } from 'src/use-cases/invoices/invoices.use-case';
import { 
  FindByIdDTO, 
  CreateInvoiceDTO, 
  UpdateInvoiceDTO, 
  FilterInvoicesDto 
} from 'src/core/dtos/invoices/invoices.dto';
import { FilterPaginationQuery } from 'src/core/dtos/pagination/paginateRequest.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly rideUseCases: InvoicesUseCases) {
    if (!this.rideUseCases) {
      throw new Error('RideUseCases must be provided');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async createInvoice(@Body() createInvoiceDTO: CreateInvoiceDTO) {
    return this.rideUseCases.createInvoice(createInvoiceDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices with filters' })
  @ApiResponse({ status: 200, description: 'Returns filtered invoices' })
  async getInvoices(@Query() filter: FilterInvoicesDto) {
    return this.rideUseCases.getInvoices(filter);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active invoices' })
  @ApiResponse({ status: 200, description: 'Returns active invoices' })
  async getActiveInvoices(@Query() paginateOptions: FilterPaginationQuery) {
    return this.rideUseCases.getActiveInvoices(paginateOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID' })
  @ApiResponse({ status: 200, description: 'Returns a specific invoice' })
  async getInvoiceById(@Param() param: FindByIdDTO) {
    return this.rideUseCases.getInvoiceById(param?.id);
  }

  @Patch(':id/pay')
  @ApiOperation({ summary: 'Mark invoice as paid' })
  @ApiResponse({ status: 200, description: 'Invoice marked as paid successfully' })
  async markInvoiceAsPaid(@Param('id') id: string) {
    return this.rideUseCases.markInvoiceAsPaid(id);
  }

  @Patch(':id/fail')
  @ApiOperation({ summary: 'Mark invoice payment as failed' })
  @ApiResponse({ status: 200, description: 'Invoice marked as failed successfully' })
  async markInvoiceAsFailed(@Param('id') id: string) {
    return this.rideUseCases.markInvoiceAsFailed(id);
  }
} 