import { IsString, IsEmail, IsPhoneNumber, IsArray, IsNumber, IsEnum, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { EStatusRide } from 'src/core/enums';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { createPaginatedResponseDto } from '../pagination/paginatedResponse.dto';

export class LocationDto {
  @ApiProperty({
    description: 'Coordinates in [longitude, latitude] format',
    example: [-74.006, 40.7128],
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: [number, number];

  @ApiProperty({
    description: 'Physical address of the location',
    example: '123 Main St, New York, NY'
  })
  @IsString()
  address: string;
  }


export class CreateRideDTO {
  @ApiProperty({
    description: 'ID of the passenger',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  passanger_id: Types.ObjectId;

  @ApiProperty({
    description: 'ID of the driver',
    example: '507f1f77bcf86cd799439012'
  })
  @IsMongoId()
  driver_id: Types.ObjectId;

  @ApiProperty({
    description: 'Pickup location details',
    type: LocationDto
  })
  @ValidateNested()
  @Type(() => LocationDto)
  pickup_location: LocationDto;

  @ApiProperty({
    description: 'Dropoff location details',
    type: LocationDto
  })
  @ValidateNested()
  @Type(() => LocationDto)
  dropoff_location: LocationDto;

  @ApiProperty({
    description: 'Price of the ride',
    example: 25.50
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Distance of the ride in kilometers',
    example: 5.2
  })
  @IsNumber()
  distance: number;

  @ApiProperty({
    description: 'Duration of the ride in minutes',
    example: 15
  })
  @IsNumber()
  duration: number;
}

export class UpdateRideDTO extends PartialType(CreateRideDTO) {
  @ApiProperty({
    description: 'Status of the ride',
    enum: EStatusRide,
    required: false
  })
  @IsOptional()
  @IsEnum(EStatusRide)
  status?: EStatusRide;

  @ApiProperty({
    description: 'When the ride started',
    required: false,
    example: '2024-03-20T10:00:00Z'
  })
  @IsOptional()
  started_at?: Date;

  @ApiProperty({
    description: 'When the ride was completed',
    required: false,
    example: '2024-03-20T10:30:00Z'
  })
  @IsOptional()
  completed_at?: Date;
}

export class FilterRidesDto {
  @ApiProperty({
    description: 'Filter by ride status',
    enum: EStatusRide,
    required: false
  })
  @IsOptional()
  @IsString()
  status?: EStatusRide;

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
    description: 'Filter rides near these coordinates [longitude, latitude]',
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
    description: 'Filter rides from this date (ISO format)',
    required: false,
    example: '2024-03-01'
  })
  @IsOptional()
  @IsString()
  date_from?: string;

  @ApiProperty({
    description: 'Filter rides until this date (ISO format)',
    required: false,
    example: '2024-03-31'
  })
  @IsOptional()
  @IsString()
  date_to?: string;
} 


export class FindByIdDTO {
  @ApiProperty({
    description: 'ID of the ride',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  id: string
}
export class RidesPaginatedResponseDto extends createPaginatedResponseDto(CreateRideDTO) { }
