import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { HealthController } from './controllers/health.controller';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './seeders/seeds.module';
import { passangersUseCasesModule } from './use-cases/passangers/passangers.module';
import { passangersController } from './controllers/passangers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(configuration.mongoUri as string),
    passangersUseCasesModule,
    CommandModule,
    SeederModule
  ],
  controllers: [
    passangersController,
    HealthController
  ],
  providers: [],
})
export class AppModule { }
