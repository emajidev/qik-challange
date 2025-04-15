import { Document, Types } from "mongoose";
import { EStatusRide } from "src/core/enums";

interface IGeoPoint {
    type?: 'Point';
    coordinates: [number, number];
    address: string;
}

export interface IRide {
    _id: Types.ObjectId;
    passanger_id: Types.ObjectId;
    driver_id: Types.ObjectId;
    status: EStatusRide;
    pickup_location: IGeoPoint;
    dropoff_location: IGeoPoint;
    price: number;
    distance: number;
    duration: number;
    created_at?: Date;
    updated_at?: Date;
    started_at?: Date;
    completed_at?: Date;
}

export type IRideDocument = IRide & Document