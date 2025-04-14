// src/core/dtos/drivers/create-driver.dto.ts
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsArray, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { EVehicleType } from '../../enums';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer'; // <-- Añade esta importación

export class VehicleDTO {
  @IsEnum(EVehicleType)
  type: EVehicleType;
  
  @IsString()
  @IsNotEmpty()
  model: string;
  
  @IsString()
  @IsNotEmpty()
  plate: string;
  
  @IsString()
  @IsNotEmpty()
  color: string;
  
  @IsNumber()
  year: number;
}

export class CreateDriverDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VehicleDTO)
  vehicle: VehicleDTO;

  @IsArray()
  @IsNumber({}, { each: true })
  location: [number, number]; // [longitude, latitude]

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}

export class UpdateDriverDTO extends PartialType(CreateDriverDTO) {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  location?: [number, number];

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}