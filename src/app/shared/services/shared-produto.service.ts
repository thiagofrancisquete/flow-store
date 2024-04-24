import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto-model';

@Injectable({
  providedIn: 'root'
})
export class SharedProdutoService {

  private produtoSubject = new BehaviorSubject<Produto | null>(null);

  /**
   * Um Observable que emite o produto atualmente selecionado.
   */
  produto$: Observable<Produto | null> = this.produtoSubject.asObservable();

  constructor() {}

  /**
   * Define o produto atualmente selecionado.
   * @param produto O produto a ser definido como atualmente selecionado.
   */
  setProduto(produto: Produto) {
    this.produtoSubject.next(produto);
  }

    /**
   * Obtém um Observable que emite o produto atualmente selecionado.
   * @returns Um Observable que emite o produto atualmente selecionado.
   */
  getProduto(): Observable<Produto | null> {
    return this.produtoSubject.asObservable();
  }
}
