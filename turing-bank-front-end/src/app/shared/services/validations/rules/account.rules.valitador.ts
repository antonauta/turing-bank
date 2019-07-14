import { Injectable } from "@angular/core";
import { IValidator, ValidationResult } from "ts.validator.fluent/dist";
import isValidCpf from '@brazilian-utils/is-valid-cpf';
import { UserModel } from "../../../../models/user.model";
import { AccountRulesValidatorInterface } from 'src/app/core/interfaces/validations/rules/account.rules.validator.interface';
import { TransferModel } from 'src/app/models/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountRulesValidator implements AccountRulesValidatorInterface {

  transferRules(validator: IValidator<TransferModel>): ValidationResult {
    return validator
 
      .NotEmpty(m => m.agencia, 'Campo obrigatório!', 'Agência')
      .NotEmpty(m => m.conta, 'Campo obrigatório.', 'Conta')
      .NotEmpty(m => m.valor, 'Campo obrigatório.', 'Valor')
      .ToResult()
  }





}