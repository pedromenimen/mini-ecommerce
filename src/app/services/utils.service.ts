import { Injectable } from '@angular/core';
import { Channel } from './../types/types';

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
  getChannels(): Array<Channel> {
    return [
      {
        img: '/assets/Bemol.logo.png',
        buttonMsg: 'Acesse o site da bemol',
        href: 'https://www.bemol.com.br ',
      },
      {
        img: '/assets/BOB-ICON1.webp',
        buttonMsg: 'Converse com o Bot Online da Bemol',
        href: 'https://chat.bemol.com.br',
      },
      {
        img: '/assets/Figura-Icone-Telefone-PNG-1024x1024.png',
        buttonMsg: 'Converse com um de nosses vendedores',
        href: 'tel:08007268300',
      },
      {
        img: '/assets/whatsapp-logo.png.webp',
        buttonMsg: 'Converse conosco pelo whatsapp',
        href: 'https://bit.ly/WppBemol',
      },
    ];
  }
}
