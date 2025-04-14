import { Module } from '@nestjs/common';
import {
  DriversController,
} from './controllers';
import { DriversUseCasesModule } from './use-cases/drivers/drivers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(configuration.mongoUri as string),
    DriversUseCasesModule,
  ],
  controllers: [
    DriversController,
    HealthController
  ],
  providers: [],
})
export class AppModule { }
