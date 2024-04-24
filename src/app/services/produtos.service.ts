import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../models/produto-model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private api = 'https://desafiotech.azurewebsites.net'
  constructor(private _http: HttpClient) { }

  getProdutos(pageSize: number, initialPage: number): Observable<any> {
    // https://desafiotech.azurewebsites.net/produto?pageSize=10&initialPage=0'

    const params = new HttpParams()
        .set("pageSize", pageSize.toString())
        .set("initialPage", initialPage.toString());

    return this._http.get<any>(`${this.api}/produto?${params}`)
  }

  getByCodigoDeBarras(cod: string, page: number, size: number) {
    const params = new HttpParams()
    .set("page", page.toString())
    .set("size", size.toString());

    return this._http.get<any>(`${this.api}/produto/${cod}?`, {params: params})
  }


  createProduto(obj: Produto): Observable<Produto> {
    return this._http.post<Produto>(`${this.api}/produto`, obj)
  }

  updateProduto(obj: Produto): Observable<Produto> {
    return this._http.put<Produto>(`${this.api}/produto`, obj)
  }

  deleteProduto(id: number) {
    // 'https://desafiotech.azurewebsites.net/produto/5'
    return this._http.delete<Produto>(`${this.api}/produto/${id}`, )
  }
}
