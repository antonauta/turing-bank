export interface Operation{
    id?: string;
    type: number;
    value: number;
    createAt: Date;
    origin: string;
    destination: string;
}