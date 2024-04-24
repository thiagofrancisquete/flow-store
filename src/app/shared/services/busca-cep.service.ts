import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private api = 'https://viacep.com.br/ws'
  constructor(private _http: HttpClient) { }

  /**
   * Obtém informações de um CEP específico.
   * @param cep O número do CEP a ser consultado.
   * @returns Um Observable contendo os dados do CEP consultado.
   */
  
  getCep(cep: number) {
    return this._http.get(`${this.api}/${cep}/json`)
  }
}
