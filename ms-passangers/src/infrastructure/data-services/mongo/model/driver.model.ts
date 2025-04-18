import { IDriverDocument } from "src/core/interfaces/drivers";
import { Schema, schemaBase, schemaOptions } from "./Model";
import { model } from "mongoose";

export const DriverSchema = new Schema<IDriverDocument>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    vehicle: {
      model: { type: String, required: true },
      plate: { type: String, required: true, unique: true },
      color: { type: String, required: true }
    },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true }
    },
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    active_trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
    ...schemaBase,
  },
  schemaOptions
);

// Índice geoespacial para búsquedas por ubicación
DriverSchema.index({ location: '2dsphere' });

export const DriverModel = model<IDriverDocument>('drivers', DriverSchema);

