import { Injectable } from "@angular/core";
import { IValidator, ValidationResult } from "ts.validator.fluent/dist";
import { UserModel } from "../../../../../domain/models/user.model";
import { UserRulesValidatorInterface } from "../../../../../interfaces/validations/rules/user.rules.validator.interface";
import isValidCpf from '@brazilian-utils/is-valid-cpf';

@Injectable({
  providedIn: 'root'
})
export class UserRulesValidator implements UserRulesValidatorInterface {

  signinRules(validator: IValidator<UserModel>): ValidationResult {
    return validator
            // email
            .NotEmpty(m => m.email, 'Campo obrigatório!', 'E-mail')
            .Email(m => m.email, 'E-mail inválido!', ' E-mail')
            .NotEmpty(m => m.password, 'Campo obrigatório.', 'Senha')
            .ToResult()
  }



  signupRules(validator: IValidator<UserModel>): ValidationResult {
    
    return validator

      // name
      .NotEmpty(m => m.name, 'Campo obrigatório.', 'Nome')
      .Length(m => m.name, 3, 100, 'Número de caracteres inválido.', 'Nome')

      // password
      .NotEmpty(m => m.password, 'Campo obrigatório.', 'Senha')
      .Length(m => m.password, 6, 16, 'Senha deve ter entre 6 a 16 caracters', 'Senha')
      .If(m => m.password != '', validator => validator
      .ForStringProperty(m => m.password, passwordValidator => passwordValidator
              .Matches("(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])", ` A sua senha deve ter pelo menos 6
               caracteres e conter pelo menos: uma letra maiúscula, uma letra minúscula e um dígito. `, "Senha")
              .Required((m, pwd) => pwd.length > 6, "Senha deve ter entre 6 a 16 caracters", "Senha")
          .ToResult())
      .ToResult())  

      // preferredName
      .NotEmpty(m => m.preferredName, 'Campo obrigatório.', 'Apelido')
      .Length(m => m.preferredName, 3, 100, 'Número de caracteres inválido.', 'Apelido')

      // email
      .NotEmpty(m => m.email, 'Campo obrigatório!', 'E-mail')
      .Email(m => m.email, 'E-mail inválido!', ' E-mail')

      // cpf
      .NotEmpty(m => m.cpf, 'Campo obrigatório!', 'CPF')
      .IsNumeric(m => m.cpf, 'CPF inválido', 'CPF')
      .Contains(m => String(isValidCpf(m.cpf)),'true', 'CPF inválido', 'CPF')
      .ToResult();
  }


}
