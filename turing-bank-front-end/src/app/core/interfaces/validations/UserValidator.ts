import { UserModel } from "../../domain/models/user.model";
import { ValidationResult } from 'ts.validator.fluent/dist';

export abstract class UserValidator {
    abstract validateFields(model: UserModel): ValidationResult;
}