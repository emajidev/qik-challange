import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideSchema } from '../infrastructure/data-services/mongo/model';
import { RidesCommand } from './rides/rides.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'rides',
        schema: RideSchema,
        collection: 'rides',
      },
    ]),
  ],
  providers: [RidesCommand],
})
export class SeedsModule {}
