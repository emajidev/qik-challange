import { Schema } from 'mongoose';

export const schemaBase = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
};

export const schemaOptions = {
  timestamps: true,
  versionKey: false,
};

export { Schema };
