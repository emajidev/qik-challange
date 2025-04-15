import { Document, Schema } from 'mongoose';
import { EVehicleType } from '../../enums';

export interface IVehicle {
    type: EVehicleType
    model: string;
    plate: string;
    color: string;
    year: number
}

export interface IRiders {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    vehicle: IVehicle
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    available: boolean;
    rating: number;
    active_trip?: Schema.Types.ObjectId;
}

export type IRidersDocument = IRiders & Document;