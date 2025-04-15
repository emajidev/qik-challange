import { Module } from '@nestjs/common';
import { InvoicesUseCases } from './invoices.use-case';
import { DataServicesModule } from 'src/services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [InvoicesUseCases],
  exports: [InvoicesUseCases],
})
export class InvoicesUseCasesModule {} 