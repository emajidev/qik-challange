// src/core/dtos/drivers/create-driver.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsArray, IsBoolean, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer'; // <-- Añade esta importación
import { ApiProperty } from '@nestjs/swagger';
import { createPaginatedResponseDto } from '../pagination/paginatedResponse.dto';

export class VehicleDto {
  @ApiProperty({ example: 'Toyota Corolla', description: 'Modelo del vehículo' })
  model: string;

  @ApiProperty({ example: 'ABC123', description: 'Placa del vehículo' })
  plate: string;

  @ApiProperty({ example: 'Blanco', description: 'Color del vehículo' })
  color: string;
}

export class LocationDto {
  @ApiProperty({
    example: 'Point',
    description: 'Tipo de geometría GeoJSON',
  })
  type: string;

  @ApiProperty({
    example: [-66.877762, 10.479194],
    description: 'Coordenadas [longitud, latitud]',
    type: [Number],
  })
  coordinates: number[];
}

export class DriverDto {
  @ApiProperty({ example: '67fd78045f0b9754fac7767d', description: 'ID único' })
  _id: string;

  @ApiProperty({ example: 'Carlos Mendoza', description: 'Nombre del conductor' })
  name: string;

  @ApiProperty({ example: 'carlos.mendoza@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: '+51987654321', description: 'Teléfono' })
  phone: string;

  @ApiProperty({ type: VehicleDto, description: 'Información del vehículo' })
  vehicle: VehicleDto;

  @ApiProperty({ type: LocationDto, description: 'Ubicación GeoJSON' })
  location: LocationDto;

  @ApiProperty({ example: true, description: 'Disponibilidad' })
  available: boolean;

  @ApiProperty({ example: 4.5, description: 'Calificación', minimum: 0, maximum: 5 })
  rating: number;

  @ApiProperty({ example: '2025-04-14T21:03:00.747Z', description: 'Fecha creación' })
  created_at: string;

  @ApiProperty({ example: '2025-04-14T21:03:00.747Z', description: 'Fecha actualización' })
  updated_at: string;
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
  @Type(() => VehicleDto)
  vehicle: VehicleDto;

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

export class FindDriverByIdDTO {
  @ApiProperty()
  @IsMongoId()
  id: string
}
export class DriverPaginatedResponseDto extends createPaginatedResponseDto(DriverDto) { }
