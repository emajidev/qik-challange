import { Module } from '@nestjs/common';
import { RidersUseCases } from './riders.use-case';
import { DataServicesModule } from 'src/services';

@Module({
  imports: [DataServicesModule],
  providers: [RidersUseCases],
  exports: [RidersUseCases],
})
export class ridersUseCasesModule { }
