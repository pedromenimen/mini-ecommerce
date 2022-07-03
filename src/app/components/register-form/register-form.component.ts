import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CepApiServiceService } from './../../services/cep-api-service.service';
import { CepResponse } from './../../types/types';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit, AfterViewInit {
  @ViewChild('cep') cep: ElementRef;
  @ViewChild('rua') rua: ElementRef;
  @ViewChild('bairro') bairro: ElementRef;
  @ViewChild('cidade') cidade: ElementRef;
  @ViewChild('uf') uf: ElementRef;
  @ViewChild('ibge') ibge: ElementRef;
  formulario: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private cepApiServiceService: CepApiServiceService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formbuilder.group({
      cep: [null],
    });
  }
  ngAfterViewInit(): void {
    console.log(this.cep);
  }

  limpa_formulário_cep() {
    this.rua.nativeElement.value = '';
    this.bairro.nativeElement.value = '';
    this.cidade.nativeElement.value = '';
    this.uf.nativeElement.value = '';
    this.ibge.nativeElement.value = '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  meu_callback(conteudo: any) {
    if (!('erro' in conteudo)) {
      this.rua.nativeElement.value = conteudo.logradouro;
      this.bairro.nativeElement.value = conteudo.bairro;
      this.cidade.nativeElement.value = conteudo.localidade;
      this.uf.nativeElement.value = conteudo.uf;
      this.ibge.nativeElement.value = conteudo.ibge;
    } else {
      this.limpa_formulário_cep();
      // alert('CEP não encontrado');
      this.openSnackBar('CEP não encontrado', 'fechar');
    }
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
        this.ibge.nativeElement.value = '...';

        this.cepApiServiceService
          .getCepJson(this.cep.nativeElement.value)
          .subscribe({
            next: (conteudo) => {
              if (!('erro' in conteudo)) {
                this.rua.nativeElement.value = conteudo.logradouro;
                this.bairro.nativeElement.value = conteudo.bairro;
                this.cidade.nativeElement.value = conteudo.localidade;
                this.uf.nativeElement.value = conteudo.uf;
                this.ibge.nativeElement.value = conteudo.ibge;
              } else {
                this.limpa_formulário_cep();
                // alert('CEP não encontrado');
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
}
