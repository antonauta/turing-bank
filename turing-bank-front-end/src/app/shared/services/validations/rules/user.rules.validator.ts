import { Injectable } from "@angular/core";
import { IValidator, ValidationResult } from "ts.validator.fluent/dist";
import isValidCpf from '@brazilian-utils/is-valid-cpf';
import { UserRulesValidatorInterface } from '../../../../core/interfaces/validations/rules/user.rules.validator.interface';
import { UserModel } from "../../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserRulesValidator implements UserRulesValidatorInterface {

  signinRules(validator: IValidator<UserModel>): ValidationResult {
    return validator
      // cpf
      .NotEmpty(m => m.cpf, 'Campo obrigatório!', 'CPF')
      .If(m => m.cpf !== null && m.cpf !== '' && m.password !== '', validator => validator 
        .Contains(m => String(isValidCpf(m.cpf)), 'true', 'CPF ou senha inválida', 'CPF')
      .ToResult())
      .NotEmpty(m => m.password, 'Campo obrigatório.', 'Senha')
      .ToResult()
  }



  signupRules(validator: IValidator<UserModel>): ValidationResult {

    return validator

      // name
      .NotEmpty(m => m.name, 'Campo obrigatório.', 'Nome Completo')
      .If(m => m.name !== null && m.name !== '', validator => validator 
        .Length(m => m.name, 3, 100, 'Número de caracteres inválido.', 'Nome Completo')
      .ToResult())
      

      // cpf
      .NotEmpty(m => m.cpf, 'Campo obrigatório!', 'CPF')
      .If(m => m.cpf !== null && m.cpf !== '', validator => validator 
        .Contains(m => String(isValidCpf(m.cpf)), 'true', 'CPF ou senha inválida', 'CPF')
      .ToResult())

      // preferredName
      .NotEmpty(m => m.preferredName, 'Campo obrigatório.', 'Apelido')
      .If(m => m.preferredName !== null && m.preferredName !== '' , validator => validator 
        .Length(m => m.preferredName, 3, 100, 'Número de caracteres inválido.', 'Apelido')
      .ToResult())
      

      // email
      .NotEmpty(m => m.email, 'Campo obrigatório!', 'E-mail')
      .If(m => m.email !== null && m.email !== '' , validator => validator 
        .Email(m => m.email, 'E-mail inválido!', ' E-mail')
      .ToResult())
      

      // password
      .NotEmpty(m => m.password, 'Campo obrigatório.', 'Senha')
      .If(m => m.password !== null && m.password !== '' , validator => validator 
        .Length(m => m.password, 6, 16, ` Senha fraca!`, 'Senha')
        .Matches(m => m.password, "(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])", ` A sua senha deve ter de 6 a 16
               caracteres e conter pelo menos: uma letra maiúscula, uma letra minúscula e um dígito. `, "Senha")
      .ToResult())
      .ToResult();
  }


}