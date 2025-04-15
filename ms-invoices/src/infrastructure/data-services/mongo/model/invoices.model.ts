import { EPaymentStatus } from "src/core";
import { IInvoiceDocument } from "src/core/interfaces/invoices";
import { Schema, schemaBase, schemaOptions } from "./Model";
import { model } from "mongoose";

export const InvoiceSchema = new Schema<IInvoiceDocument>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    invoice_number: { type: String, required: true, unique: true },
    payment_method: { type: String, required: true },
    payment_status: {
      type: String,
      enum: EPaymentStatus,
      default: EPaymentStatus.pending,
      required: true
    },
    ride_id: { type: Schema.Types.ObjectId, required: true },
    tax_amount: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    payment_date: { type: Date },
    payment_reference: { type: String },
    notes: { type: String },
    ...schemaBase
  },
  schemaOptions
);

InvoiceSchema.index({ invoice_number: 1 });
InvoiceSchema.index({ payment_status: 1 });
InvoiceSchema.index({ payment_date: 1 });

export const InvoiceModel = model<IInvoiceDocument>('invoices', InvoiceSchema); 