import { FabricantesService } from './../../../services/fabricantes.service';
import { SharedPessoaService } from './../../../shared/services/shared-pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from 'src/app/models/pessoa-model';

import { BuscaCepService } from 'src/app/shared/services/busca-cep.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fabricantes-form',
  templateUrl: './fabricantes-form.component.html',
  styleUrls: ['./fabricantes-form.component.scss'],
})
export class FabricantesFormComponent implements OnInit {
  fabricantesForm!: FormGroup;
  isEditing = false;
  pessoa!: Pessoa | null;

  constructor(
    private fb: FormBuilder,
    private buscaCepService: BuscaCepService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedPessoaService: SharedPessoaService,
    private toastr: ToastrService,
    private fabricantesService: FabricantesService
  ) {}

  ngOnInit(): void {
    // Obtém o nome da rota atual e verifica se é uma edição ou cadastro
    const routeName =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path;

    if (routeName !== 'cadastrar-fabricante') {
      this.isEditing = true;
      // Recupera o objeto Pessoa do serviço compartilhado
      this.sharedPessoaService.getPessoa().subscribe(pessoa => {
        this.pessoa = pessoa;
      });
      // Constrói o formulário após recuperar o objeto Pessoa
      this.buildForm();
    } else {
      this.isEditing = false;
      // Constrói o formulário de cadastro
      this.buildForm();
    }
  }

  /**
   * Constrói o formulário de fabricantes.
   * Define os campos do formulário com os valores da pessoa(fabricante), se existirem.
   * Aplica validadores aos campos necessários.
   */
  buildForm() {
    this.fabricantesForm = this.fb.group({
      nome: [this.pessoa ? this.pessoa.nome : null, [Validators.required]],
      cnpj: [this.pessoa ? this.pessoa.cnpj : null, [Validators.required]],
      cep: [this.pessoa ? this.pessoa.cep : null],
      logradouro: [this.pessoa ? this.pessoa.logradouro : null],
      numero: [this.pessoa ? this.pessoa.numero : null],
      complemento: [this.pessoa ? this.pessoa.complemento : null],
      bairro: [this.pessoa ? this.pessoa.bairro : null],
      cidade: [this.pessoa ? this.pessoa.cidade : null],
      estado: [this.pessoa ? this.pessoa.estado : null],
      contatoTipo: [this.pessoa ? this.pessoa.contatoTipo : null, [Validators.required]],
      contato: [this.pessoa ? this.pessoa.contato : null, [Validators.required]],
    });
  }

  buscaCep() {
    let cep = this.fabricantesForm.get('cep')?.value;

    if (cep !== null) {
      console.log(cep);
      this.buscaCepService.getCep(cep).subscribe({
        next: (res: any) => {
          if (!res.erro) {
            this.fabricantesForm.patchValue({
              logradouro: res.logradouro,
              bairro: res.bairro,
              cidade: res.localidade,
              estado: res.uf,
              complemento: res.complemento,
            });
          } else {
            this.fabricantesForm.patchValue({
              logradouro: null,
              bairro: null,
              cidade: null,
              estado: null,
              complemento: null,
            });
          }
        },
        error: (err) => {
          this.toastr.error(`Não foi possível fazer a busca automática do endereço! Por favor, preencha os dados manualmente.`)
        },
      });
    }
  }

  save() {
    if(this.isEditing) {
      this.update()
    } else {
      let obj = this.fabricantesForm.value
      this.fabricantesService.createPessoa(obj).subscribe({
        next: res => {
          this.toastr.success('Fabricante criado com sucesso!');
          this.goBack()
        },
        error: err => {
          this.toastr.error(`Erro ao criar fabricante!`)
        }
      })
    }
  }

  update() {
    let obj = this.fabricantesForm.value;

    this.fabricantesService.updatePessoa(obj).subscribe({
      next: res => {
        this.toastr.success('Fabricante atualizado com sucesso!');
        this.goBack()
      },
      error: err => {
        this.toastr.error(`Erro ao editar fabricante!`)
      }
    })
  }

  goBack() {
    this.router.navigate(['fabricantes'])
  }
}
