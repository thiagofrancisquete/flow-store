export interface Pessoa {
  id:           number;
  nome:         string;
  cnpj:         string;
  cep:          string;
  logradouro:   string;
  numero:       string;
  complemento?: string;
  bairro:       string;
  cidade:       string;
  estado:       string;
  contatoTipo:  string;
  contato:      string;
}