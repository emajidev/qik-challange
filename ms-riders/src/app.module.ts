import { Module } from '@nestjs/common';
import {
  ridersController,
} from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { HealthController } from './controllers/health.controller';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './seeders/seeds.module';
import { ridersUseCasesModule } from './use-cases/riders/riders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(configuration.mongoUri as string),
    ridersUseCasesModule,
    CommandModule,
    SeederModule
  ],
  controllers: [
    ridersController,
    HealthController
  ],
  providers: [],
})
export class AppModule { }
