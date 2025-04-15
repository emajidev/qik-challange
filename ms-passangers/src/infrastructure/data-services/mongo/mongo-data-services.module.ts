import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassangersMongoRepository } from './repositories/passangers.repository';
import { passangerschema } from './model/passangers.model';
import { DriversMongoRepository } from './repositories/drivers.repository';
import { DriverSchema } from './model/driver.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "passangers", schema: passangerschema, collection: "passangers" },
    ]),
    MongooseModule.forFeature([
      { name: "drivers", schema: DriverSchema, collection: "drivers" },
    ])
  ],
  providers: [PassangersMongoRepository, DriversMongoRepository],
  exports: [PassangersMongoRepository, DriversMongoRepository],
})
export class MongoDataServicesModule { }
