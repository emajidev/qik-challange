import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { MongoGenericRepository } from './mongo-generic-repository';
import { IRideDocument } from 'src/core/interfaces/rides';



@Injectable()
export class RidesMongoRepository
    extends MongoGenericRepository<IRideDocument> {
    constructor(
        @InjectModel("rides")
        private model: Model<IRideDocument>,
    ) {
        super(model);
    }

    async findAll() {
        return this.model.find({});
    }

}
