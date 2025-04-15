import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ridersMongoRepository } from './repositories/riders.repository';
import { riderschema } from './model/riders.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "riders", schema: riderschema, collection: "riders" },
    ]),
  ],
  providers: [ridersMongoRepository],
  exports: [ridersMongoRepository],
})
export class MongoDataServicesModule { }
