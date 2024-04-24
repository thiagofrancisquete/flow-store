import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa-model';

@Injectable({
  providedIn: 'root'
})
export class SharedPessoaService {

  private pessoaSubject = new BehaviorSubject<Pessoa | null>(null);
  /**
   * Um Observable que emite a pessoa atualmente selecionada.
   */
  pessoa$: Observable<Pessoa | null> = this.pessoaSubject.asObservable();

  constructor() {}

  /**
   * Define a pessoa atualmente selecionada.
   * @param pessoa A pessoa a ser definida como atualmente selecionada.
   */
  setPessoa(pessoa: Pessoa) {
    this.pessoaSubject.next(pessoa);
  }

  /**
   * Obtém um Observable que emite a pessoa atualmente selecionada.
   * @returns Um Observable que emite a pessoa atualmente selecionada.
   */
  getPessoa(): Observable<Pessoa | null> {
    return this.pessoaSubject.asObservable();
  }
}
