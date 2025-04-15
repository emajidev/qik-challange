import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RidesController } from './controllers';
import { RidesUseCasesModule } from './use-cases/rides/rides.module';
import { SeedsModule } from './seeders/seeds.module';
import { CommandModule } from 'nestjs-command';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(configuration.mongoUri as string),
    CommandModule,
    RidesUseCasesModule,
    SeedsModule,
  ],
  controllers: [RidesController],
})
export class AppModule { }
