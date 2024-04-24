import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private api = 'https://viacep.com.br/ws'
  constructor(private _http: HttpClient) { }

  getCep(cep: number) {
    return this._http.get(`${this.api}/${cep}/json`)
  }
}
