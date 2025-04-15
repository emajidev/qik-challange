import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { passangerschema } from 'src/infrastructure/data-services/mongo/model/passangers.model';
import { passangersCommand } from './passangers/passangers.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'passangers',
        schema: passangerschema,
        collection: 'passangers',
      },

    ])
  ],
  providers: [passangersCommand],
})
export class SeederModule { }
