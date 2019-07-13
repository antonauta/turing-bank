import {Document } from 'mongoose';
export interface Operation extends Document{
    id?: string;
    type: number;
    value: number;
    createAt: Date;
    origin: string;
    destination: string;
}