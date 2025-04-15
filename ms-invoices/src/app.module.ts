import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvoicesController } from './controllers';
import { InvoicesUseCasesModule } from './use-cases/invoices/invoices.module';
import { SeedsModule } from './seeders/seeds.module';
import { CommandModule } from 'nestjs-command';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(configuration.mongoUri as string),
    CommandModule,
    InvoicesUseCasesModule,
    SeedsModule,
  ],
  controllers: [InvoicesController],
})
export class AppModule { }
