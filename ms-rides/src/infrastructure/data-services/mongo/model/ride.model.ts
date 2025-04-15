import { EStatusRide } from "src/core";
import { IRideDocument } from "src/core/interfaces/rides";
import { Schema, schemaBase, schemaOptions } from "./Model";
import { model } from "mongoose";


export const RideSchema = new Schema<IRideDocument>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    passanger_id: { type: Schema.Types.ObjectId, ref: 'passangers', required: true },
    driver_id: { type: Schema.Types.ObjectId, ref: 'drivers', required: true },
    status: {
      type: String,
      enum: EStatusRide,
      default: EStatusRide.pending,
      required: true
    },
    pickup_location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true }
    },
    dropoff_location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true }
    },
    price: { type: Number, required: true },
    distance: { type: Number, required: true }, // in Km
    duration: { type: Number, required: true }, // in min
    started_at: { type: Date },
    completed_at: { type: Date },
    ...schemaBase
  },
  schemaOptions
);

RideSchema.index({ 'pickup_location': '2dsphere' });
RideSchema.index({ 'dropoff_location': '2dsphere' });

RideSchema.index({ status: 1 });
RideSchema.index({ driver_id: 1 });
RideSchema.index({ 'rider.email': 1 });

export const RideModel = model<IRideDocument>('rides', RideSchema); 