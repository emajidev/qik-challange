import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideSchema } from './model';
import { RidesMongoRepository } from './repositories/rides.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Rides", schema: RideSchema, collection: "Rides" },
    ]),
  ],
  providers: [RidesMongoRepository],
  exports: [RidesMongoRepository],
})
export class MongoDataServicesModule { }
