import { Module } from '@nestjs/common';
import { PassangersUseCases } from './passangers.use-case';
import { DataServicesModule } from 'src/services';

@Module({
  imports: [DataServicesModule],
  providers: [PassangersUseCases],
  exports: [PassangersUseCases],
})
export class passangersUseCasesModule { }
