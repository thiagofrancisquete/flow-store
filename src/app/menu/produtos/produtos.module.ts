import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { CoreModule } from 'src/app/core/modules/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProdutosTableComponent } from './produtos-table/produtos-table.component';
import { ProdutosDialogComponent } from './produtos-dialog/produtos-dialog.component';


@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutosFormComponent,
    ProdutosTableComponent,
    ProdutosDialogComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    CoreModule,
    MaterialModule
  ]
})
export class ProdutosModule { }
