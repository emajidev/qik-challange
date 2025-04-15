import { Document, Model, SortOrder, Types } from 'mongoose';
import { IGenericRepository, PageDto, PageMetaDto, PageOptionsDto } from '../../../../core';
import { PageLinksDto } from 'src/core/dtos/pagination/page-links.dto';
import { FilterPaginationQuery } from 'src/core/dtos/pagination/paginateRequest.dto';


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
  async findById(id: string | Types.ObjectId): Promise<T | null> {
    return await this.entityModel.findById(id);

  }


  async findByIdAndRemove(id: Types.ObjectId): Promise<T | null> {
    try {
      return this.entityModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting document');
    }
  }

  async find(filter: any, project = {}): Promise<T[]> {
    try {
      return this.entityModel.find(filter, project).exec();
    } catch (error) {
      throw new Error('Error finding documents');
    }
  }

  async count(filter: object): Promise<number> {
    try {

      return this.entityModel.countDocuments(filter || {});
    } catch (error) {
      throw new Error('Error counting documents');
    }
  }
  async paginate(paginateOptions: FilterPaginationQuery): Promise<T[]> {
    const page = paginateOptions?.page && paginateOptions?.page > 0 ? Number(paginateOptions.page) : 1;
    const sort = { [paginateOptions?.sortBy || 'created_at']: (!paginateOptions?.orderBy ? 'asc' : paginateOptions?.orderBy) as SortOrder }
    try {

      return this.entityModel
        .find(paginateOptions?.filter || {})
        .skip((page - 1) * (paginateOptions.limit || 10))
        .limit(paginateOptions.limit || 10)
        .sort(sort)
        .exec();
    } catch (err) {
      throw new Error('Error paginating');
    }
  }
  async paginateAggregate(paginateOptions: FilterPaginationQuery): Promise<T[]> {
    const page = paginateOptions?.page && paginateOptions?.page > 0 ? paginateOptions.page : 1;
    const limit = paginateOptions.limit || 10;
    const sortField = paginateOptions?.sortBy || 'created_at';
    const sortOrder = (!paginateOptions?.orderBy ? 'asc' : paginateOptions?.orderBy) as SortOrder;

    try {
      const pipeline: any[] = [];
      if (paginateOptions?.filter) {
        pipeline.push({ $match: paginateOptions.filter });
      }
      pipeline.push({ $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } });
      pipeline.push(
        { $skip: (page - 1) * limit },
        { $limit: limit }
      );

      return this.entityModel.aggregate(pipeline).exec();
    } catch (err) {
      throw new Error('Error paginating');
    }
  }
  async findPaginate(
    paginateOptions: FilterPaginationQuery,
  ): Promise<PageDto<T>> {

    const getAll = await this.find(paginateOptions?.filter || {}, { _id: 1 });
    const total = getAll?.length
    if (!paginateOptions?.limit) {
      paginateOptions.limit = total
    }
    const data = await this.paginate(paginateOptions);
    const meta = new PageMetaDto({
      pageOptionsDto: new PageOptionsDto(paginateOptions),
      total_elements: total,
      page_size: data.length,
    });
    return new PageDto<T>(
      data,
      meta,
      new PageLinksDto(meta, 'query'),
    );
  }

  async findPaginateAggregate(
    paginateOptions: FilterPaginationQuery,
  ): Promise<PageDto<T>> {
    const query = [{ $match: paginateOptions?.filter || {} }]

    const total = await this.aggregate(query);
    if (!paginateOptions?.limit) {
      paginateOptions.limit = total
    }
    const data = await this.paginateAggregate(paginateOptions);
    const meta = new PageMetaDto({
      pageOptionsDto: new PageOptionsDto(paginateOptions),
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
