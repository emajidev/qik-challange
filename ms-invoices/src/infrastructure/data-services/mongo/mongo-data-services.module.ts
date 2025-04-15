import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from './model';
import { InvoicesMongoRepository } from './repositories/invoices.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "invoices", schema: InvoiceSchema, collection: "invoices" },
    ]),
  ],
  providers: [InvoicesMongoRepository],
  exports: [InvoicesMongoRepository],
})
export class MongoDataServicesModule { }
