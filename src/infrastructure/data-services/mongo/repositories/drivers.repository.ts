import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IDriverDocument } from 'src/core/interfaces/drivers/drivers.interface';
import { MongoGenericRepository } from './mongo-generic-repository';



@Injectable()
export class DriversMongoRepository
    extends MongoGenericRepository<IDriverDocument> {
    constructor(
        @InjectModel("Drivers")
        private model: Model<IDriverDocument>,
    ) {
        super(model);
    }

    async findAll() {
        return this.model.find({});
    }

}
