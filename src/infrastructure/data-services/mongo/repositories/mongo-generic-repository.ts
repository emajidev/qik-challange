import { Document, Model, Types } from 'mongoose';
import { IGenericRepository, PageDto, PageMetaDto, PageOptionsDto } from '../../../../core';
import { PageLinksDto } from 'src/core/dtos/pagination/page-links.dto';
import { FilterPaginationQuery } from '../http/middleware/req-filterpaginate.middleware';


export abstract class MongoGenericRepository<
  T extends Document,
> extends IGenericRepository<T> {
  constructor(protected entityModel: Model<T>) {
    super();
  }

  async aggregate(
    pipeline: any,
    options?: any,
  ): Promise<any> {
    const result = await this.entityModel.aggregate(pipeline, options);
    return result;
  }
  async create(data: T | Partial<T>): Promise<T> {
    try {
      const entity = new this.entityModel(data);
      return entity.save();
    } catch (error) {
      throw new Error('Error creating document');
    }
  }
  async findOne(filter: any): Promise<T | null> {
    return this.entityModel.findOne(filter);

  }

  async findOneAndUpdate(
    filter: any,
    data: Partial<T>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(filter, data, {
      new: true,
    });
  }

  async findByIdAndUpdate(id: Types.ObjectId | string, data: Partial<T>): Promise<| null> {
    return this.entityModel.findByIdAndUpdate(id, data, { new: true });
  }
  async findById(id: Types.ObjectId): Promise<T | null> {
    return await this.entityModel.findById(id);

  }


  async findByIdAndRemove(id: Types.ObjectId): Promise<T | null> {
    try {
      return this.entityModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting document');
    }
  }

  async find(filter: any): Promise<T[]> {
    try {
      return this.entityModel.find(filter);
    } catch (error) {
      throw new Error('Error finding documents');
    }
  }

  async count(filter: FilterPaginationQuery): Promise<number> {
    try {
      return this.entityModel.countDocuments(filter);
    } catch (error) {
      throw new Error('Error counting documents');
    }
  }
  async paginate(filter: FilterPaginationQuery): Promise<T[]> {
    const page = filter.page && filter.page > 0 ? filter.page : 1;

    try {
      const fields = filter.fields?.length
        ? filter.fields.replace(/\s/g, '').replace(/,/g, ' ')
        : '';

      return this.entityModel
        .find(filter, fields)
        .skip((page - 1) * (filter.limit || 10))
        .limit(filter.limit || 10)
        .sort(filter.sort || {})
        .exec();
    } catch (err) {
      throw new Error('Error paginating');
    }
  }

  async findPaginate(
    filter: FilterPaginationQuery,
  ): Promise<PageDto<T>> {
    const data = await this.paginate(filter);
    const total = await this.count(filter);

    const meta = new PageMetaDto({
      pageOptionsDto: new PageOptionsDto(filter),
      total_elements: total,
      page_size: data.length,
    });
    return new PageDto<T>(
      data,
      meta,
      new PageLinksDto(meta, 'query'),
    );
  }
}
