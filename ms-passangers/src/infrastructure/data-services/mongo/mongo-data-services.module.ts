import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { passangersMongoRepository } from './repositories/passangers.repository';
import { passangerschema } from './model/passangers.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "passangers", schema: passangerschema, collection: "passangers" },
    ]),
  ],
  providers: [passangersMongoRepository],
  exports: [passangersMongoRepository],
})
export class MongoDataServicesModule { }
