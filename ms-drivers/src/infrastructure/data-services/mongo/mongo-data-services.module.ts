import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './model';
import { DriversMongoRepository } from './repositories/drivers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "drivers", schema: DriverSchema, collection: "drivers" },
    ]),
  ],
  providers: [DriversMongoRepository],
  exports: [DriversMongoRepository],
})
export class MongoDataServicesModule { }
