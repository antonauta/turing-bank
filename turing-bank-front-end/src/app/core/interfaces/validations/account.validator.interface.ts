
import { ValidationResult } from 'ts.validator.fluent/dist';
import { Injectable } from '@angular/core';
import { TransferModel } from 'src/app/models/transfer.model';

@Injectable({
    providedIn: 'root'
})
export abstract class AccountValidatorInterface {
    abstract trasferValitador(model: TransferModel): ValidationResult;
    abstract paymentValitador(model: TransferModel): ValidationResult;
}
