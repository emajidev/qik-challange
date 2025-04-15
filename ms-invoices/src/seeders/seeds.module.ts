import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from 'src/infrastructure/data-services/mongo/model';
import { InvoicesCommand } from './invoices/invoices.command';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'invoices',
        schema: InvoiceSchema,
        collection: 'invoices',
      },
    ]),
  ],
  providers: [InvoicesCommand],
})
export class SeedsModule {}
