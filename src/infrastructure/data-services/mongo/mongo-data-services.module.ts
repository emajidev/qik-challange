import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './model';
import { DriversMongoRepository } from './repositories/drivers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Drivers", schema: DriverSchema, collection: "Drivers" },
    ]),
  ],
  providers: [DriversMongoRepository],
  exports: [DriversMongoRepository],
})
export class MongoDataServicesModule { }
