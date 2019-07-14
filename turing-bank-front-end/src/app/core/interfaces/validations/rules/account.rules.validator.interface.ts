import { IValidator, ValidationResult } from "ts.validator.fluent/dist";
import { TransferModel } from 'src/app/models/transfer.model';

export abstract class AccountRulesValidatorInterface {
    /**
     * Regras do formulário de transferencia
     * @param validator 
     */
    abstract transferRules(validator: IValidator<TransferModel>): ValidationResult;

  
}