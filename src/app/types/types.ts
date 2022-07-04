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
  bairro: string;
  cidade: string;
  rua: string;
  uf: string;
}

export interface APIResponse {
  [key: string]: string | Array<string>;
}

export interface Channel {
  img: string;
  description: string;
  href: string;
  socialMedia: boolean;
}
