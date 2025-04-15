import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IInvoiceDocument } from 'src/core/interfaces/invoices/invoices.interface';

@Injectable()
export class InvoicesCommand {
  constructor(
    @InjectModel('invoices') private readonly rideModel: Model<IInvoiceDocument>,
  ) { }

  @Command({
    command: 'seed:invoices',
    describe: 'Seed invoices collection with locations at 1km, 3km and 6km from current position',
  })
  async seed() {
    try {
      const invoicesData = require('./invoices.json');
      await this.rideModel.deleteMany({});
      await this.rideModel.insertMany(invoicesData);
      console.log('Invoices seeded successfully');
    } catch (error) {
      console.error('Error seeding invoices:', error.message);
    }
  }

} 