import { Module } from '@nestjs/common';
import { RideUseCases } from './rides.use-case';
import { DataServicesModule } from 'src/services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [RideUseCases],
  exports: [RideUseCases],
})
export class RidesUseCasesModule {} 