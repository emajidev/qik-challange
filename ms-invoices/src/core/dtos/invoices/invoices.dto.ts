import { IsString, IsEmail, IsArray, IsNumber, IsEnum, IsOptional, IsMongoId, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { EPaymentStatus } from 'src/core/enums';
import { ApiProperty } from '@nestjs/swagger';
import { createPaginatedResponseDto } from '../pagination/paginatedResponse.dto';
import { mongo, Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class CreateInvoiceDTO {
  @ApiProperty({
    description: 'Unique invoice number',
    example: 'INV-2024-001'
  })
  @IsString()
  invoice_number: string;

  @ApiProperty({
    description: 'Id of ride',
    example: '12343234523421'
  })
  @IsString()
  @IsMongoId()
  ride_id: string;

  @ApiProperty({
    description: 'Payment method used',
    example: 'credit_card'
  })
  @IsString()
  payment_method: string;

  @ApiProperty({
    description: 'Payment status',
    enum: EPaymentStatus,
    example: EPaymentStatus.pending
  })
  @IsEnum(EPaymentStatus)
  payment_status: EPaymentStatus;

  @ApiProperty({
    description: 'Tax amount',
    example: 2.55
  })
  @IsNumber()
  tax_amount: number;

  @ApiProperty({
    description: 'Total amount including tax',
    example: 28.05
  })
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    description: 'Additional notes',
    required: false,
    example: 'Special request: Extra luggage'
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateInvoiceDTO extends PartialType(CreateInvoiceDTO) {
  @ApiProperty({
    description: 'Payment status',
    enum: EPaymentStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(EPaymentStatus)
  payment_status?: EPaymentStatus;

  @ApiProperty({
    description: 'When the ride started',
    required: false,
    example: '2024-03-20T10:00:00Z'
  })
  @IsOptional()
  @IsDate()
  started_at?: Date;

  @ApiProperty({
    description: 'When the ride was completed',
    required: false,
    example: '2024-03-20T10:30:00Z'
  })
  @IsOptional()
  @IsDate()
  completed_at?: Date;

  @ApiProperty({
    description: 'Payment date',
    required: false,
    example: '2024-03-20T10:30:00Z'
  })
  @IsOptional()
  @IsDate()
  payment_date?: Date;

  @ApiProperty({
    description: 'Payment reference number',
    required: false,
    example: 'PAY-123456'
  })
  @IsOptional()
  @IsString()
  payment_reference?: string;
}

export class FilterInvoicesDto {
  @ApiProperty({
    description: 'Filter by payment status',
    enum: EPaymentStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(EPaymentStatus)
  payment_status?: EPaymentStatus;

  @ApiProperty({
    description: 'Filter by driver ID',
    required: false,
    example: '507f1f77bcf86cd799439012'
  })
  @IsOptional()
  @IsMongoId()
  driver_id?: string;

  @ApiProperty({
    description: 'Filter by rider email',
    required: false,
    example: 'rider@example.com'
  })
  @IsOptional()
  @IsEmail()
  rider_email?: string;

  @ApiProperty({
    description: 'Filter by invoice number',
    required: false,
    example: 'INV-2024-001'
  })
  @IsOptional()
  @IsString()
  invoice_number?: string;


  @ApiProperty({
    description: 'Filter by ride ID',
    required: false,
    example: '507f1f77bcf86cd799439012'
  })
  @IsOptional()
  @IsMongoId()
  ride_id?: string;
  @ApiProperty({
    description: 'Filter invoices near these coordinates [longitude, latitude]',
    required: false,
    example: [-74.006, 40.7128],
    type: [Number]
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  near_coordinates?: [number, number];

  @ApiProperty({
    description: 'Maximum distance in kilometers for near_coordinates filter',
    required: false,
    example: 5
  })
  @IsOptional()
  @IsNumber()
  max_distance?: number;

  @ApiProperty({
    description: 'Filter invoices from this date (ISO format)',
    required: false,
    example: '2024-03-01'
  })
  @IsOptional()
  @IsString()
  date_from?: string;

  @ApiProperty({
    description: 'Filter invoices until this date (ISO format)',
    required: false,
    example: '2024-03-31'
  })
  @IsOptional()
  @IsString()
  date_to?: string;
}

export class FindByIdDTO {
  @ApiProperty({
    description: 'ID of the invoice',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  id: string
}

export class InvoicesPaginatedResponseDto extends createPaginatedResponseDto(CreateInvoiceDTO) { }
