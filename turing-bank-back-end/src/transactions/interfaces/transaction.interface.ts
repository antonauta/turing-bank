export interface Transaction{
    _id?: string;
    type: number;
    value: number;
    createAt: Date;
    origin: string;
    destin: string;
}