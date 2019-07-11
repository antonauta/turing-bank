import { Document } from 'mongoose';
export interface User extends Document {
    _id?: string;
    name?: string;
    account?: string;
    preferredName?: string;
    agency?: string;
    email?: string;
    cpf?: string;
    balance?: number;
    password?: string;
}
