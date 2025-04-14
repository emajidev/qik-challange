import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { DriversSeederService } from './drivers.seeder.service';

@Injectable()
export class DriversCommand {
  constructor(private readonly seederService: DriversSeederService) {}

  @Command({
    command: 'seed:drivers',
    describe: 'Create drivers',
  })
  async create() {
    const data: any = await this.seederService.findAll();
    if (data.length == 0) {
      await this.import();
    }
    process.exit(1);
  }

  async import() {
    Logger.log('Start import drivers');
    const items = require('./drivers.json');
    for (const item of items) {
      const result: any = await this.seederService.create({
        ...item,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      Logger.log('insert record', result);
    }
    Logger.log('Finish import drivers');
  }
}
