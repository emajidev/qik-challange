import { Document, Schema } from 'mongoose';

export interface IPassangers {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    available: boolean;
    active_trip?: Schema.Types.ObjectId;
}

export type IPassangersDocument = IPassangers & Document;