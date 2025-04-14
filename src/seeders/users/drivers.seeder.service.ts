import { Injectable } from '@nestjs/common';
import { DriversMongoRepository } from '../../infrastructure/data-services/mongo/repositories/drivers.repository';

@Injectable()
export class DriversSeederService {
  constructor(private readonly mongoRepository: DriversMongoRepository) {}
  async findAll(): Promise<any> {
    return await this.mongoRepository.findAll();
  }

  async create(body): Promise<any> {
    return await this.mongoRepository.create(body);
  }
}
