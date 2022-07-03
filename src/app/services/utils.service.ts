import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  capitalizer(response: string | Array<string>) {
    if (typeof response === 'string') {
      return response[0].toUpperCase() + response.slice(1);
    } else {
      let responseToBeSended = response[0];
      return responseToBeSended[0].toUpperCase() + responseToBeSended.slice(1);
    }
  }
  buttonAllowed(inputList: HTMLCollectionOf<HTMLInputElement>) {
    const input_listt = Array.from(inputList);
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
}
