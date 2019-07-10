import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {



  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(80),
  ]);

  preferredName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailRegex)
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);

  cpf = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  cadastroForm: FormGroup = this.fb.group({
    name: this.name,
    password: this.password,
    preferredName: this.preferredName,
    email: this.email,
    cpf: this.cpf,
  });


  constructor(
    private fb: FormBuilder,
    private userValidatorInterface: UserValidatorInterface
    ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.cadastroForm.value);
    const v = this.userValidatorInterface.signupValitador(this.cadastroForm.value)
    console.log(v);
  }

}
