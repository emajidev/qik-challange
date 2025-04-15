import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export default {
  port: parseInt(process.env.PORT as string, 10) || 3000,
  prefix: '/ms-passangers/api/v1',
  mongoUri: process.env.MONGODB_URI,
  msName: "Microservice passangers"
}