export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface FormBuilderValues {
  cep: string;
  number: string;
  email: string;
  password: string;
  name: string;
}

export interface APIResponse {
  [key: string]: string | Array<string>;
}

export interface Channel {
  img: string;
  buttonMsg: string;
  href: string
}
