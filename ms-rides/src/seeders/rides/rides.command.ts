import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRideDocument } from 'src/core/interfaces/rides/rides.interface';

@Injectable()
export class RidesCommand {
  constructor(
    @InjectModel('Rides') private readonly rideModel: Model<IRideDocument>,
  ) {}

  @Command({
    command: 'seed:rides',
    describe: 'Seed rides collection with locations at 1km, 3km and 6km from current position',
  })
  async seed() {
    try {
      const count = await this.rideModel.countDocuments();
      
    } catch (error) {
      console.error('Error seeding rides:', error.message);
    }
  }

  private async importRidesWithVariableDistances(currentLocation: [number, number]) {
    console.log('Starting rides import with variable distances...');
    const items = require('./rides.json');

    const groups = [
      { distance: 1, count: 0 },
      { distance: 3, count: 0 },
      { distance: 6, count: 0 },
    ];

    const ridesToInsert: any = [];

    for (const item of items) {
      const groupIndex = Math.floor(Math.random() * groups.length);
      const group = groups[groupIndex];
      group.count++;

      const distance = group.distance;
      const angle = Math.random() * 2 * Math.PI;
      const dx = distance * Math.cos(angle) / 111.32;
      const dy = distance * Math.sin(angle) / 111.32;

      ridesToInsert.push({
        ...item,
        location: {
          type: 'Point',
          coordinates: [
            currentLocation[0] + dx,
            currentLocation[1] + dy,
          ],
        },
      });
    }

    const result = await this.rideModel.insertMany(ridesToInsert);
    console.log(`Inserted ${result.length} rides at variable distances from your location:`);
    console.log(`- ${groups[0].count} rides at ~1km`);
    console.log(`- ${groups[1].count} rides at ~3km`);
    console.log(`- ${groups[2].count} rides at ~6km`);
  }
} 