import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';

const routes: Routes = [
  { path: '', component: ProdutosComponent },
  { path: 'cadastrar-produto', component: ProdutosFormComponent },
  { path: 'editar-produto/:id', component: ProdutosFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
