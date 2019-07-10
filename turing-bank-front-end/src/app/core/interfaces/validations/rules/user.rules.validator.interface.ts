import { IValidator, ValidationResult } from "ts.validator.fluent/dist";
import { UserModel } from "../../../domain/models/user.model";

export abstract class UserRulesValidatorInterface {
    /**
     * Regras do formulário de login
     * @param validator 
     */
    abstract signinRules(validator: IValidator<UserModel>): ValidationResult;

    /**
     * Regra do formulário de cadastro
     * @param validator 
     */
    abstract signupRules(validator: IValidator<UserModel>): ValidationResult;
}