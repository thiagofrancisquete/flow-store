import { Pessoa } from 'src/app/models/pessoa-model';
import { FabricantesService } from './../../../services/fabricantes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedPessoaService } from 'src/app/shared/services/shared-pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { FabricantesDialogComponent } from '../fabricantes-dialog/fabricantes-dialog.component';

@Component({
  selector: 'app-fabricantes-table',
  templateUrl: './fabricantes-table.component.html',
  styleUrls: ['./fabricantes-table.component.scss'],
})
export class FabricantesTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'cnpj', 'endereco', 'actions'];
  pageSizeOptions: number[] = [1, 2, 5, 10];

  pageSize: number = 5; // Tamanho de página padrão
  pageNumber: number = 0; // Número da página padrão
  totalElements: number = 0; // Total de elementos padrão
  totalPages: number = 0; // Total de páginas padrão

  cnpjInput!: string;
  ascendingNomeOrder = true;
  ascendingCnpjOrder = true;
  ascendingEnderecoOrder = true;

  constructor(
    private fabricantesService: FabricantesService,
    private router: Router,
    private sharedPessoaService: SharedPessoaService,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFabricantes();
  }

  /**
   * Obtém fabricantes do servidor e atualiza a fonte de dados da tabela.
   */
  getFabricantes() {
    this.fabricantesService
      .getPessoa(this.pageSize, this.pageNumber)
      .subscribe({
        next: (res) => {
          //console.log('Fabricantes: ', res);
          this.dataSource = new MatTableDataSource(res.content);
          this.pageSize = res.pageable.pageSize;
          this.pageNumber = res.pageable.pageNumber;
          this.totalElements = res.totalElements;
          this.totalPages = res.totalPages;
        },
        error: (err) => {
          //console.log('Erro ao buscar dados do servidor', err);
          this.toastr.error(`Erro ao buscar fabricantes do servidor!`);
        },
      });
  }

  paginar(event: any) {
    //console.log(event);
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getFabricantes(); // Chama novamente o método para buscar os dados com base na nova página selecionada
  }

  // redireciona para pagina de criação de fabricante
  create() {
    this.router.navigate(['fabricantes/cadastrar-fabricante']);
  }

  delete(row: Pessoa) {
    let id = row.id;
    this.fabricantesService.deletePessoa(id).subscribe({
      next: (res) => {
       // console.log('deletado com sucesso', res);
        this.toastr.success('Fabricante excluído com sucesso!');
        this.getFabricantes()
      },
      error: (err) => {
        //console.log('Erro ao excluir', err);
        this.toastr.error(`Erro ao excluir item!`);
      },
    });
  }

  edit(row: Pessoa) {
    this.sharedPessoaService.setPessoa(row);
    this.router.navigate([`fabricantes/editar-fabricante/${row.id}`]);
  }

  /**
   * Busca fabricantes por CNPJ e atualiza a fonte de dados da tabela.
   * Se o CNPJ estiver vazio, recarrega a lista completa de fabricantes.
   */
  searchCnpj() {
    console.log(this.cnpjInput);

    if (!this.cnpjInput || this.cnpjInput.trim() === '') {
      this.getFabricantes();
      return; // Retorna para evitar a execução do código restante
  }

    this.fabricantesService.getPessoaByCnpj(this.cnpjInput, 0, 5).subscribe({
      next: (res) => {
        console.log(res);
        if(res.content.length === 0) {
          this.toastr.warning(`O cnpj ${this.cnpjInput} não foi encontrado!`);
          this.getFabricantes()
        } else {
          this.dataSource = new MatTableDataSource(res.content)
          this.pageSize = res.pageable.pageSize;
          this.pageNumber = res.pageable.pageNumber;
          this.totalElements = res.totalElements;
          this.totalPages = res.totalPages;
        }
      },
      error: (err) => {
        //console.log(err);
        this.toastr.error(`Erro ao buscar fabricantes do servidor!`);
      },
    });
  }

  seeInfo(row: Pessoa) {
    this.dialog
    .open(FabricantesDialogComponent, {
        width: this.getDialogWidth(),
        data: row,
        height: "90%",
        autoFocus: false
    })
    .afterClosed()
    .subscribe(() => this.getFabricantes());
  }

  sortDataByNome() {
    // compara os valores da tabela ASCII de cada caractere nas strings a.nome e b.nome e determina a ordem alfabética com base nisso e na direção determinada
    if (this.ascendingNomeOrder) {
      this.dataSource.data.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      this.dataSource.data.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    // determina a direção da ordenação
    this.ascendingNomeOrder = !this.ascendingNomeOrder;

    // garante que as alterações nos dados sejam refletidas na exibição da tabela
    this.dataSource._updateChangeSubscription();
  }

  sortDataByCnpj() {
    if (this.ascendingCnpjOrder) {
      this.dataSource.data.sort((a, b) => a.cnpj.localeCompare(b.cnpj));
    } else {
      this.dataSource.data.sort((a, b) => b.cnpj.localeCompare(a.cnpj));
    }
    this.ascendingCnpjOrder = !this.ascendingCnpjOrder;
    this.dataSource._updateChangeSubscription();
  }

  sortDataByEndereco() {
    if (this.ascendingEnderecoOrder) {
      this.dataSource.data.sort((a, b) =>
        a.logradouro.localeCompare(b.logradouro)
      );
    } else {
      this.dataSource.data.sort((a, b) =>
        b.logradouro.localeCompare(a.logradouro)
      );
    }
    this.ascendingEnderecoOrder = !this.ascendingEnderecoOrder;
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
