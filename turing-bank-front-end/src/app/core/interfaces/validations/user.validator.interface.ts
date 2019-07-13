import { UserModel } from "./../../../models/user.model";
import { ValidationResult } from 'ts.validator.fluent/dist';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class UserValidatorInterface {
    abstract signinValitador(model: UserModel): ValidationResult;
    abstract signupValitador(model: UserModel): ValidationResult;
}
