import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto-model';

@Injectable({
  providedIn: 'root'
})
export class SharedProdutoService {

  private produtoSubject = new BehaviorSubject<Produto | null>(null);
  produto$: Observable<Produto | null> = this.produtoSubject.asObservable();

  constructor() {}

  setProduto(produto: Produto) {
    this.produtoSubject.next(produto);
  }

  getProduto(): Observable<Produto | null> {
    return this.produtoSubject.asObservable();
  }
}
