export interface Payload {
    cpf: string;
    _id:string;
    account: string;
    balance:number;
    agency:string;
    preferredName:string;
    name:string;
    iat?: number;
    email:string;
    expiresIn?: string;
  }