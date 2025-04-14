import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversSeederService } from './users/drivers.seeder.service';
import { DriverSchema } from '../infrastructure/data-services/mongo/model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Drivers',
        schema: DriverSchema,
        collection: 'Drivers',
      },
      
    ]),
  ],
  providers: [DriversSeederService],
})
export class SeederModule {}
