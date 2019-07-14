import { UserLoggedModel } from './userLogged.model';

export interface TransferModel {
    agencia?: string;
    conta?: UserLoggedModel;
    valor?: string;
    descricao?: string;
  }
  