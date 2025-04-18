import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { IDriverDocument } from 'src/core';
import axios from 'axios';

@Injectable()
export class DriversCommand {
  constructor(
    @InjectModel('drivers') private readonly driverModel: Model<IDriverDocument>,
  ) { }

  @Command({
    command: 'seed:drivers',
    describe: 'Seed drivers collection with locations at 1km, 3km and 6km from current position',
  })
  async seed() {
    try {
      const count = await this.driverModel.countDocuments();
      if (count > 0) {
        console.log('Drivers collection already has data. Skipping seeding.');
        return;
      }

      const currentLocation = await this.getCurrentLocation();
      console.log('Seeding drivers around your current location:', currentLocation);

      await this.importFromJson(currentLocation);
      console.log('Drivers seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding drivers:', error.message);
    } finally {
      process.exit(0);
    }
  }

  private async getCurrentLocation(): Promise<{ longitude: number, latitude: number }> {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      return {
        longitude: parseFloat(response.data.longitude),
        latitude: parseFloat(response.data.latitude)
      };
    } catch (error) {
      console.warn('Could not get current location, using default coordinates');
      return { longitude: -77.03123, latitude: -12.04456 }; // Default Lima coordinates
    }
  }

  
  private calculateNewCoordinates(originalCoords: [number, number], distance: number, bearing: number): [number, number] {
    const [lon1, lat1] = originalCoords;
    const radiusEarth = 6371;
    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const bearingRad = bearing * Math.PI / 180;

    const lat2Rad = Math.asin(
      Math.sin(lat1Rad) * Math.cos(distance / radiusEarth) +
      Math.cos(lat1Rad) * Math.sin(distance / radiusEarth) * Math.cos(bearingRad)
    );

    const lon2Rad = lon1Rad + Math.atan2(
      Math.sin(bearingRad) * Math.sin(distance / radiusEarth) * Math.cos(lat1Rad),
      Math.cos(distance / radiusEarth) - Math.sin(lat1Rad) * Math.sin(lat2Rad)
    );

    return [
      lon2Rad * 180 / Math.PI,
      lat2Rad * 180 / Math.PI
    ];
  }

  private async importFromJson(currentLocation: { longitude: number, latitude: number }) {
    console.log('Starting drivers import with variable distances...');

    const items = require('./drivers.json');
    const centerCoords: [number, number] = [currentLocation.longitude, currentLocation.latitude];
    const oneKM = 1
    const threeKM = 3
    const sixKM = 6

    const groups = [
      { distance: oneKM, count: Math.floor(items.length / 3) },
      { distance: threeKM, count: Math.floor(items.length / 3) },
      { distance: sixKM, count: items.length - 2 * Math.floor(items.length / 3) }
    ];

    let currentIndex = 0;
    const driversToInsert: any = [];

    for (const group of groups) {
      for (let i = 0; i < group.count; i++) {
        if (currentIndex >= items.length) break;

        const bearing = Math.random() * 360;

        const newCoords = this.calculateNewCoordinates(
          centerCoords,
          group.distance,
          bearing
        );

        driversToInsert.push({
          _id: new mongo.ObjectId(),
          ...items[currentIndex],
          location: {
            type: "Point",
            coordinates: newCoords
          },
          created_at: new Date(),
          updated_at: new Date(),
        });

        currentIndex++;
      }
    }

    const result = await this.driverModel.insertMany(driversToInsert);

    console.log(`Inserted ${result.length} drivers at variable distances from your location:`);
    console.log(`- ${groups[0].count} drivers at ~1km`);
    console.log(`- ${groups[1].count} drivers at ~3km`);
    console.log(`- ${groups[2].count} drivers at ~6km`);

    return result;
  }
}