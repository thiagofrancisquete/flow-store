import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdutosDialogComponent } from '../../produtos/produtos-dialog/produtos-dialog.component';

@Component({
  selector: 'app-fabricantes-dialog',
  templateUrl: './fabricantes-dialog.component.html',
  styleUrls: ['./fabricantes-dialog.component.scss'],
})
export class FabricantesDialogComponent implements OnInit {
  nome!: string;
  cnpj!: string;
  cep!: string;
  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cidade!: string;
  estado!: string;
  contatoTipo!: string;
  contato!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProdutosDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.editData);
    if (this.editData) {
      this.nome = this.editData.nome;
      this.cnpj = this.editData.cnpj;
      this.cep = this.editData.cep;
      this.logradouro = this.editData.logradouro;
      this.numero = this.editData.numero;
      this.complemento = this.editData.complemento;
      this.bairro = this.editData.bairro;
      this.cidade = this.editData.cidade;
      this.estado = this.editData.estado;
      this.contato = this.editData.contato;
      this.contatoTipo = this.editData.contatoTipo;
    }
  }
  
  goBack() {
    this.dialogRef.close();
  }
}
