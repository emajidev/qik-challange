import { Module } from '@nestjs/common';
import { DriverUseCases } from './drivers.use-case';
import { DataServicesModule } from 'src/services';

@Module({
  imports: [DataServicesModule],
  providers: [DriverUseCases],
  exports: [DriverUseCases],
})
export class DriversUseCasesModule { }
