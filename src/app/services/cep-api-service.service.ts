import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepResponse, FormBuilderValues } from '../types/types';
import { APIResponse } from './../types/types';

@Injectable({
  providedIn: 'root',
})
export class CepApiServiceService {
  constructor(private http: HttpClient) {}
  getCepJson(cep: string): Observable<CepResponse> {
    return this.http.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  registerUser(data: FormBuilderValues): Observable<APIResponse> {
    let dataToBeSended = {
      email: data.email,
      password: data.password,
      name: data.name,
      address: {
        cep: data.cep,
        number: data.number,
        bairro: data.bairro,
        cidade: data.cidade,
        rua: data.rua,
        uf: data.uf,
      },
    };
    return this.http.post<any>(
      'https://mini-ecommerce-bemol.herokuapp.com/api/users/register/',
      dataToBeSended
    );
  }

  loginUser(data: FormBuilderValues): Observable<APIResponse> {
    return this.http.post<any>(
      'https://mini-ecommerce-bemol.herokuapp.com/api/users/login/',
      data
    );
  }
}
