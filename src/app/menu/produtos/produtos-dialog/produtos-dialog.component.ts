import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-produtos-dialog',
  templateUrl: './produtos-dialog.component.html',
  styleUrls: ['./produtos-dialog.component.scss']
})
export class ProdutosDialogComponent implements OnInit{

  nome!: string;
  descricao!: string;
  codigoBarras!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProdutosDialogComponent>
  ) {}

  ngOnInit(): void {
    if(this.editData) {
      this.nome = this.editData.nome;
      this.descricao = this.editData.descricao;
      this.codigoBarras = this.editData.codigoBarras
    }
  }

  goBack() {
    this.dialogRef.close();
  }

}
