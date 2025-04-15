import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const Document = mongoose.Document;
const schemaOptions = {
  versionKey: false,
};
const schemaBase = {
  created_by: Schema.Types.ObjectId,
  created_at: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  updated_at: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  deleted_at: Schema.Types.Date,
};

export { schemaOptions, mongoose, Schema, schemaBase };
