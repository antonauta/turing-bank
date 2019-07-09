export interface Statement {
  id?: string;
  operation: number;
  value: number;
  date: Date;
  accountOrigin: string;
  accountDestiny: string;
}
