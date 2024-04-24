import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Pessoa } from '../models/pessoa-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService {

  private api = 'https://desafiotech.azurewebsites.net'
  constructor(private _http: HttpClient) { }

  getPessoa(pageSize: number, initialPage: number): Observable<any> {
    const params = new HttpParams()
        .set("pageSize", pageSize)
        .set("initialPage", initialPage);

    return this._http.get<any>(`${this.api}/pessoa?${params.toString()}`)
  }

  getPessoaByCnpj(cnpj: string, page: number, size: number): Observable<any> {
    // https://desafiotech.azurewebsites.net/pessoa/{cnpj}?page=0&size=10&sort=string'

    const params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString());

    return this._http.get<any>(`${this.api}/pessoa/${cnpj}`, {params: params})
  }

  getPessoaByName(nome: string, page: number, size: number): Observable<any> {
    // 'https://desafiotech.azurewebsites.net/pessoa/pessoas?nome={nome}&page=0&size=10&sort=string'

    const params = new HttpParams()
    .set("nome", nome)
    .set("page", page)
    .set("size", size);

    return this._http.get<any>(`${this.api}/pessoas?${params.toString()}`)
  }

  createPessoa(obj: Pessoa): Observable<Pessoa> {
    return this._http.post<Pessoa>(`${this.api}/pessoa`, obj)
  }

  updatePessoa(obj: Pessoa): Observable<Pessoa> {
    return this._http.put<Pessoa>(`${this.api}/pessoa`, obj)
  }

  deletePessoa(id: number) {
    // 'https://desafiotech.azurewebsites.net/pessoa/5'
    return this._http.delete<Pessoa>(`${this.api}/pessoa/${id}`, )
  }
}
