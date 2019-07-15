import { Injectable } from '@angular/core';
import { ValidationResult, Validator } from 'ts.validator.fluent/dist';
import { AccountValidatorInterface } from 'src/app/core/interfaces/validations/account.validator.interface';
import { TransferModel } from 'src/app/models/transfer.model';
import { AccountRulesValidator } from './rules/account.rules.valitador';

@Injectable({
  providedIn: 'root'
})
export class AccountValidator implements AccountValidatorInterface {
  
    

  constructor(
    private accountRulesValidator: AccountRulesValidator
  ) {
  }

    /**
   *  Validar transferencia antes do envio
   * @param model 
   */
  trasferValitador(model: TransferModel): ValidationResult {
    return new Validator(model).Validate(this.accountRulesValidator.transferRules);
  }


/**
   *  Validar pagamento antes do envio
   * @param model 
   */
  paymentValitador(model: TransferModel): ValidationResult {
    return new Validator(model).Validate(this.accountRulesValidator.paymentRules);
  }

}