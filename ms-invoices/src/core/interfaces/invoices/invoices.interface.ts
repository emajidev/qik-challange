import { Document, Types } from "mongoose";
import { EPaymentStatus } from "src/core/enums";


export interface IInvoice {
    _id: Types.ObjectId
    invoice_number: string;
    payment_method: string;
    payment_status: EPaymentStatus;
    ride_id: Types.ObjectId;
    tax_amount: number;
    total_amount: number;
    payment_date?: Date;
    payment_reference?: string;
    notes?: string;
}

export type IInvoiceDocument = IInvoice & Document;