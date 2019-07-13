import { Injectable } from '@angular/core';
import { ValidationResult, Validator } from 'ts.validator.fluent/dist';
import { UserValidatorInterface } from '../../../core/interfaces/validations/user.validator.interface';
import { UserRulesValidator } from './rules/user.rules.validator';
import { UserModel } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserValidator implements UserValidatorInterface {

  constructor(
    private userRulesValidator: UserRulesValidator
  ) {
  }

  /**
   *  Validar login antes do envio
   * @param model 
   */
  signinValitador(model: UserModel): ValidationResult {
    return new Validator(model).Validate(this.userRulesValidator.signinRules)
  }

  /**
   * Validar Cadastro antes do envio
   * @param model 
   */
  signupValitador(model: UserModel): ValidationResult {
    return new Validator(model).Validate(this.userRulesValidator.signupRules);
  }



}