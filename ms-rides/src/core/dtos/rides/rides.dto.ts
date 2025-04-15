import { IsString, IsEmail, IsPhoneNumber, IsArray, IsNumber, IsEnum, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { EStatusRide } from 'src/core/enums';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { createPaginatedResponseDto } from '../pagination/paginatedResponse.dto';

export class LocationDto {
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: [number, number];

  @IsString()
  address: string;
  
  @IsEnum(['Point'])
  type: 'Point' = 'Point';
}


export class CreateRideDTO {
  @IsMongoId()
  rider_id: Types.ObjectId;

  @IsMongoId()
  driver_id: Types.ObjectId;

  @ValidateNested()
  @Type(() => LocationDto)
  pickup_location: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  dropoff_location: LocationDto;

  @IsNumber()
  price: number;

  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;
}

export class UpdateRideDTO extends PartialType(CreateRideDTO) {
  @IsOptional()
  @IsEnum(EStatusRide)
  status?: EStatusRide;

  @IsOptional()
  started_at?: Date;

  @IsOptional()
  completed_at?: Date;
}

export class FilterRidesDto {
  @IsOptional()
  @IsString()
  status?: EStatusRide;

  @IsOptional()
  @IsMongoId()
  driver_id?: string;

  @IsOptional()
  @IsEmail()
  rider_email?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  near_coordinates?: [number, number];

  @IsOptional()
  @IsNumber()
  max_distance?: number;

  @IsOptional()
  @IsString()
  date_from?: string;

  @IsOptional()
  @IsString()
  date_to?: string;
} 


export class FindByIdDTO {
  @ApiProperty()
  @IsMongoId()
  id: string
}
export class RidesPaginatedResponseDto extends createPaginatedResponseDto(CreateRideDTO) { }
