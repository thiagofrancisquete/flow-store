import { SharedProdutoService } from './../../../shared/services/shared-produto.service';
import { ProdutosService } from './../../../services/produtos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ToastrService } from 'ngx-toastr';

import { Produto } from './../../../models/produto-model';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProdutosDialogComponent } from '../produtos-dialog/produtos-dialog.component';

@Component({
  selector: 'app-produtos-table',
  templateUrl: './produtos-table.component.html',
  styleUrls: ['./produtos-table.component.scss'],
})
export class ProdutosTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'produto',
    'codigoBarras',
    'fabricante',
    'descricao',
    'actions',
  ];
  pageSizeOptions: number[] = [1, 2, 5, 10];

  pageSize: number = 5; // Tamanho de página padrão
  pageNumber: number = 0; // Número da página padrão
  totalElements: number = 0; // Total de elementos padrão
  totalPages: number = 0; // Total de páginas padrão

  codigoDeBarrasInput!: string;

  ascendingProdutoOrder = true;
  ascendingFabricanteOrder = true;
  ascendingDescricaoOrder = true;
  ascendingCodOrder = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private produtosService: ProdutosService,
    private sharedProdutoService: SharedProdutoService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos() {
    this.produtosService.getProdutos(this.pageSize, this.pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.content);
        this.pageSize = res.pageable.pageSize;
        this.pageNumber = res.pageable.pageNumber;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  paginar(event: any) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getProdutos(); // Chama novamente o método para buscar os dados com base na nova página selecionada
  }

  create() {
    console.log('clicou');
    this.router.navigate(['produtos/cadastrar-produto']);
  }

  edit(row: Produto) {
    // atribui o produto selecionado ao observable
    this.sharedProdutoService.setProduto(row);
    this.router.navigate([`produtos/editar-produto/${row.id}`]);
  }

  seeInfo(row: Produto) {
    this.dialog
      .open(ProdutosDialogComponent, {
        width: this.getDialogWidth(),
        data: row,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe(() => this.getProdutos());
  }

  delete(row: Produto) {
    let id = row.id;
    this.produtosService.deleteProduto(id).subscribe({
      next: (res) => {
        this.toastr.success('Produto excluído com sucesso!');
        this.getProdutos();
      },
      error: (err) => {
        this.toastr.error(`Erro ao excluir item!`);
      },
    });
  }

  searchCodBarras() {
    console.log(this.codigoDeBarrasInput);
    console.log(typeof this.codigoDeBarrasInput);

    if (!this.codigoDeBarrasInput || this.codigoDeBarrasInput.trim() === '') {
      this.getProdutos();
      return;
    }

    this.produtosService
      .getByCodigoDeBarras(this.codigoDeBarrasInput, 0, 5)
      .subscribe({
        next: (res) => {
          if (res.content.length === 0) {
            this.toastr.warning(
              `O produto com o código ${this.codigoDeBarrasInput} não foi encontrado!`
            );
            this.getProdutos();
          } else {
            this.dataSource = new MatTableDataSource(res.content);
            this.pageSize = res.pageable.pageSize;
            this.pageNumber = res.pageable.pageNumber;
            this.totalElements = res.totalElements;
            this.totalPages = res.totalPages;
          }
        },
      });
  }

  sortDataByDescricao() {
    if (this.ascendingDescricaoOrder) {
      this.dataSource.data.sort((a, b) =>
        a.descricao.localeCompare(b.descricao)
      );
    } else {
      this.dataSource.data.sort((a, b) =>
        b.descricao.localeCompare(a.descricao)
      );
    }
    this.ascendingDescricaoOrder = !this.ascendingDescricaoOrder;

    this.dataSource._updateChangeSubscription();
  }

  sortDataByFabricante() {
    if (this.ascendingFabricanteOrder) {
      this.dataSource.data.sort((a, b) =>
        a.descricao.localeCompare(b.descricao)
      );
    } else {
      this.dataSource.data.sort((a, b) =>
        b.descricao.localeCompare(a.descricao)
      );
    }
    this.ascendingFabricanteOrder = !this.ascendingFabricanteOrder;

    this.dataSource._updateChangeSubscription();
  }

  sortDataByProduto() {
    if (this.ascendingProdutoOrder) {
      this.dataSource.data.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      this.dataSource.data.sort((a, b) => b.nome.localeCompare(a.nome));
    }
    this.ascendingProdutoOrder = !this.ascendingProdutoOrder;

    this.dataSource._updateChangeSubscription();
  }

  sortDataByCod() {
    if (this.ascendingCodOrder) {
      this.dataSource.data.sort((a, b) =>
        a.codigoBarras.localeCompare(b.codigoBarras)
      );
    } else {
      this.dataSource.data.sort((a, b) =>
        b.codigoBarras.localeCompare(a.codigoBarras)
      );
    }
    this.ascendingCodOrder = !this.ascendingCodOrder;

    this.dataSource._updateChangeSubscription();
  }

  private getDialogWidth(): string {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return '90%';
    } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
      return '70%';
    } else {
      return '30%';
    }
  }
}
