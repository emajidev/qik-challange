import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IRidersDocument } from 'src/core/interfaces/riders/riders.interface';
import { MongoGenericRepository } from './mongo-generic-repository';



@Injectable()
export class ridersMongoRepository
    extends MongoGenericRepository<IRidersDocument> {
    constructor(
        @InjectModel("riders")
        private model: Model<IRidersDocument>,
    ) {
        super(model);
    }

    async findAll() {
        return this.model.find({});
    }

}
