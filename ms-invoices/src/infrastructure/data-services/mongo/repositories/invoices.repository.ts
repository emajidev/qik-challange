import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { MongoGenericRepository } from './mongo-generic-repository';
import { IInvoiceDocument } from 'src/core';



@Injectable()
export class InvoicesMongoRepository
    extends MongoGenericRepository<IInvoiceDocument> {
    constructor(
        @InjectModel("invoices")
        private model: Model<IInvoiceDocument>,
    ) {
        super(model);
    }

    async findAll() {
        return this.model.find({});
    }

}
