import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CepApiServiceService {
  constructor(private http: HttpClient) {}
  getCepJson(cep: string): Observable<CepResponse> {
    return this.http.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
