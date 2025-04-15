import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateInvoiceDTO,
  UpdateInvoiceDTO,
  FilterInvoicesDto,
} from 'src/core/dtos/invoices/invoices.dto';
import { mongo, Types } from 'mongoose';
import { InvoicesMongoRepository } from 'src/infrastructure/data-services/mongo/repositories/invoices.repository';
import { EPaymentStatus } from 'src/core/enums';
import { IInvoice } from 'src/core/interfaces/invoices/invoices.interface';
import { PageDto } from 'src/core';
import { HttpStatusCode } from 'axios';
import { FilterPaginationQuery } from 'src/core/dtos/pagination/paginateRequest.dto';

@Injectable()
export class InvoicesUseCases {
  constructor(private readonly invoicesRepository: InvoicesMongoRepository) { }

  async createInvoice(createInvoiceDTO: CreateInvoiceDTO): Promise<IInvoice> {
    try {
      return await this.invoicesRepository.create({
        _id: new mongo.ObjectId(),
        ...createInvoiceDTO,
        ride_id: new Types.ObjectId(createInvoiceDTO?.ride_id)
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatusCode.InternalServerError,
      );
    }
  }

  async getInvoices(filter: FilterInvoicesDto): Promise<PageDto<IInvoice>> {
    try {
      const query: any = {};

      if (filter.payment_status) {
        query.payment_status = filter.payment_status;
      }

      if (filter.invoice_number) {
        query.invoice_number = filter.invoice_number;
      }

      if (filter.date_from && filter.date_to) {
        query.created_at = {
          $gte: new Date(filter.date_from),
          $lte: new Date(filter.date_to)
        };
      }

      const paginationQuery = new FilterPaginationQuery({
        filter: query,
        sortBy: 'created_at',
        orderBy: 'DESC',
        page: 1,
        limit: 10
      });

      return await this.invoicesRepository.findPaginate(paginationQuery);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatusCode.InternalServerError,
      );
    }
  }

  async getActiveInvoices(optionsPaginate: FilterPaginationQuery): Promise<PageDto<IInvoice>> {
    optionsPaginate.filter = {
      payment_status: EPaymentStatus.pending
    };
    return this.invoicesRepository.findPaginate(optionsPaginate);
  }

  async getInvoiceById(id: string): Promise<IInvoice> {
    try {
      const invoice = await this.invoicesRepository.findById(new Types.ObjectId(id));
      if (!invoice) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      return invoice;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        error.message,
        HttpStatusCode.InternalServerError,
      );
    }
  }

  async markInvoiceAsPaid(id: string): Promise<IInvoice> {
    return this.updateInvoiceStatus(id, EPaymentStatus.paid);
  }

  async markInvoiceAsFailed(id: string): Promise<IInvoice> {
    return this.updateInvoiceStatus(id, EPaymentStatus.failed);
  }

  async markInvoiceAsRefunded(id: string): Promise<IInvoice> {
    return this.updateInvoiceStatus(id, EPaymentStatus.refunded);
  }

  private async updateInvoiceStatus(id: string, status: EPaymentStatus): Promise<IInvoice> {
    try {
      const invoice = await this.invoicesRepository.findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          payment_status: status,
          payment_date: new Date()
        }
      );
      if (!invoice) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      return invoice;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        error.message,
        HttpStatusCode.InternalServerError,
      );
    }
  }
} 