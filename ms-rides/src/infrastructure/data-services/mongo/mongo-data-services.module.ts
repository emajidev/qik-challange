import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideSchema } from './model';
import { RidesMongoRepository } from './repositories/rides.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "rides", schema: RideSchema, collection: "rides" },
    ]),
  ],
  providers: [RidesMongoRepository],
  exports: [RidesMongoRepository],
})
export class MongoDataServicesModule { }
