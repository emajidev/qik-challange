import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRideDocument } from 'src/core/interfaces/rides/rides.interface';

@Injectable()
export class RidesCommand {
  constructor(
    @InjectModel('rides') private readonly rideModel: Model<IRideDocument>,
  ) { }

  @Command({
    command: 'seed:rides',
    describe: 'Seed rides collection with locations at 1km, 3km and 6km from current position',
  })
  async seed() {
    try {
      const ridesData = require('./rides.json');
      await this.rideModel.deleteMany({});
      await this.rideModel.insertMany(ridesData);
      console.log('Rides seeded successfully');
    } catch (error) {
      console.error('Error seeding rides:', error.message);
    }
  }

} 