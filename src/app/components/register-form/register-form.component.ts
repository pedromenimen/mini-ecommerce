import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CepApiServiceService } from './../../services/cep-api-service.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('cep') cep: ElementRef;
  @ViewChild('rua') rua: ElementRef;
  @ViewChild('bairro') bairro: ElementRef;
  @ViewChild('cidade') cidade: ElementRef;
  @ViewChild('uf') uf: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('passwordConfirmation') passwordConfirmation: ElementRef;
  formulario: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private cepApiServiceService: CepApiServiceService,
    private utilsService: UtilsService
  ) {
    this.formulario = this.formbuilder.group({
      cep: [null],
      number: [null],
      email: [null],
      password: [null],
      name: [null],
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.buttonAllowed();
  }

  limpa_formulário_cep() {
    this.rua.nativeElement.value = '';
    this.bairro.nativeElement.value = '';
    this.cidade.nativeElement.value = '';
    this.uf.nativeElement.value = '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  pesquisacep(valor: any) {
    var cep = valor.replace(/\D/g, '');

    if (cep != '') {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.rua.nativeElement.value = '...';
        this.bairro.nativeElement.value = '...';
        this.cidade.nativeElement.value = '...';
        this.uf.nativeElement.value = '...';

        this.cepApiServiceService
          .getCepJson(this.cep.nativeElement.value)
          .subscribe({
            next: (conteudo) => {
              if (!('erro' in conteudo)) {
                this.rua.nativeElement.value = conteudo.logradouro;
                this.bairro.nativeElement.value = conteudo.bairro;
                this.cidade.nativeElement.value = conteudo.localidade;
                this.uf.nativeElement.value = conteudo.uf;
              } else {
                this.limpa_formulário_cep();
                this.openSnackBar('CEP não encontrado', 'fechar');
              }
            },
            error: () => {},
            complete: () => {},
          });
      } else {
        this.limpa_formulário_cep();
        this.openSnackBar('Formato de CEP inválido', 'fechar');
      }
    } else {
      this.limpa_formulário_cep();
    }
  }

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
  onSubmit() {
    if (
      this.password.nativeElement.value !==
      this.passwordConfirmation.nativeElement.value
    ) {
      this.openSnackBar('As senhas são diferentes', 'fechar');
    } else if (this.password.nativeElement.value.length < 8) {
      this.openSnackBar('A senha é muito curta', 'fechar');
    } else {
      this.cepApiServiceService.registerUser(this.formulario.value).subscribe({
        next: () => {
          this.openSnackBar('Conta criada com sucesso.', 'fechar');
        },
        error: (response) => {
          this.openSnackBar(
            this.utilsService.capitalizer(response.error.email),
            'fechar'
          );
        },
      });
    }
  }
}
