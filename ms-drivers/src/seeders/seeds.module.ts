import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from '../infrastructure/data-services/mongo/model';
import { DriversCommand } from './drivers/drivers.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Drivers',
        schema: DriverSchema,
        collection: 'Drivers',
      },

    ])
  ],
  providers: [DriversCommand],
})
export class SeederModule { }
