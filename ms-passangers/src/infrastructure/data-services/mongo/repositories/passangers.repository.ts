import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IPassangersDocument } from 'src/core/interfaces/passangers/passangers.interface';
import { MongoGenericRepository } from './mongo-generic-repository';



@Injectable()
export class PassangersMongoRepository
    extends MongoGenericRepository<IPassangersDocument> {
    constructor(
        @InjectModel("passangers")
        private model: Model<IPassangersDocument>,
    ) {
        super(model);
    }

    async findAll() {
        return this.model.find({});
    }

}
