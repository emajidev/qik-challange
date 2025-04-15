import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideSchema } from '../infrastructure/data-services/mongo/model';
import { RidesCommand } from './rides/rides.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Rides',
        schema: RideSchema,
        collection: 'Rides',
      },
    ]),
  ],
  providers: [RidesCommand],
})
export class SeedsModule {}
