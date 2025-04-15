import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassangersDocument } from 'src/core';

@Injectable()
export class passangersCommand {
  constructor(
    @InjectModel('passangers') private readonly passangersModel: Model<IPassangersDocument>,
  ) { }

  @Command({
    command: 'seed:passangers',
    describe: 'Seed passangers collection with locations at 1km, 3km and 6km from current position',
  })
  async seed() {
    try {
      const data = require('./passangers.json');
      await this.passangersModel.deleteMany({});
      await this.passangersModel.insertMany(data);
      console.log('passangers seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding passangers:', error.message);
    } finally {
      process.exit(0);
    }
  }


}