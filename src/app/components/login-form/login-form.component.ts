import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CepApiServiceService } from './../../services/cep-api-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private formbuilder: FormBuilder,
    private cepApiServiceService: CepApiServiceService,
    private router: Router
  ) {
    this.formulario = this.formbuilder.group({
      email: [null],
      password: [null],
    });
  }

  ngOnInit(): void {}
  buttonAllowed() {
    let input_list = document.getElementsByTagName('input');
    const input_listt = Array.from(input_list);
    let anyEmptyInput!: boolean;
    input_listt.map((input: HTMLInputElement) => {
      if (!anyEmptyInput) {
        if (input.value.length < 1) anyEmptyInput = true;
        else {
          anyEmptyInput = false;
        }
      }
    });
    return anyEmptyInput;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
  onSubmit() {
    this.cepApiServiceService.loginUser(this.formulario.value).subscribe({
      next: (response) => {
        this.openSnackBar('Bem vindo', 'fechar');
        if (typeof response['token'] === 'string') {
          localStorage.setItem('token', response['token']);
        }
        this.router.navigate(['']);
      },
      error: (response) => {
        let key = Object.getOwnPropertyNames(response.error)
        this.openSnackBar(response.error[key[0]], 'fechar');
      },
    });
  }
}
