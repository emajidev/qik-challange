// src/scripts/seed.ts

import { CommandFactory } from "nest-commander";
import { SeederModule } from "./seeds.module";
import { DriversSeederService } from "./users/drivers.seeder.service";

async function bootstrap() {
  await CommandFactory.run(SeederModule, {
    providers: [DriversSeederService],
  });
}

bootstrap();