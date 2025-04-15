import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { riderschema } from 'src/infrastructure/data-services/mongo/model/riders.model';
import { ridersCommand } from './riders/riders.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'riders',
        schema: riderschema,
        collection: 'riders',
      },

    ])
  ],
  providers: [ridersCommand],
})
export class SeederModule { }
