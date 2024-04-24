import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa-model';

@Injectable({
  providedIn: 'root'
})
export class SharedPessoaService {

  private pessoaSubject = new BehaviorSubject<Pessoa | null>(null);
  pessoa$: Observable<Pessoa | null> = this.pessoaSubject.asObservable();

  constructor() {}

  setPessoa(pessoa: Pessoa) {
    this.pessoaSubject.next(pessoa);
  }

  getPessoa(): Observable<Pessoa | null> {
    return this.pessoaSubject.asObservable();
  }
}
