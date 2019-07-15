import { UserModel } from './user.model';

export interface UserRequestModel {
    token?: string;
    user?: UserModel;
  }