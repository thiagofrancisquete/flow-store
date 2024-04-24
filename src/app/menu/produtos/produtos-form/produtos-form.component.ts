import { SharedProdutoService } from './../../../shared/services/shared-produto.service';
import { FabricantesService } from './../../../services/fabricantes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/pessoa-model';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/models/produto-model';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss'],
})
export class ProdutosFormComponent implements OnInit {
  produtosForm!: FormGroup;
  isEditing: boolean = false;
  fabricantesList: Pessoa[] = []
  produto!: Produto | null

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private produtosService: ProdutosService,
    private fabricantesService: FabricantesService,
    private sharedProdutoService: SharedProdutoService
  ) {}

  ngOnInit(): void {
    this.getFabricantes()
    const routeName =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path;

    if(routeName !== 'cadastrar-produto') {
      this.isEditing = true;
      this.sharedProdutoService.getProduto().subscribe(produto => {
        this.produto = produto
      })
      this.buildForm()
    } else {
      this.isEditing = false;
      this.buildForm()
    }
  }

  buildForm() {
    this.produtosForm = this.fb.group({
      nome: [this.produto ? this.produto.nome : null, [Validators.required]],
      descricao: [this.produto ? this.produto.descricao : null],
      codigoBarras: [this.produto ? this.produto.codigoBarras : null, [Validators.required]],
      fabricanteID: [this.produto ? this.produto.id : null, [Validators.required]]
    });
  }

  save() {
    if(this.isEditing) {
      this.update()
    } else {
      let obj = this.produtosForm.value
      this.produtosService.createProduto(obj).subscribe({
        next: res => {
          console.log(res)
          this.toastr.success('Produto criado com sucesso')
          this.goBack()
        },
        error: err => {
          console.log('Erro ao criar', err)
          this.toastr.error(`Erro ao criar produto`)
        }
      })
    }
  }

  update() {
    let obj = this.produtosForm.value
    this.produtosService.updateProduto(obj).subscribe({
      next: res => {
        this.toastr.success('Produto atualizado com sucesso!')
        this.goBack()
      },
      error: err => {
        console.log(err)
        this.toastr.error(`Erro ao editar produto! ${err}`)
      }
    })
  }

  goBack() {
    this.router.navigate(['produtos'])
  }

  getFabricantes() {
    this.fabricantesService.getPessoa(50, 0).subscribe({
      next: res => {
        console.log(res.content)
        this.fabricantesList = res.content
      }
    })
  }
}
