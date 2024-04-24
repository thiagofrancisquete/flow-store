import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'produtos', loadChildren: () => import('./menu/produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: 'fabricantes', loadChildren: () => import('./menu/fabricantes/fabricantes.module').then(m => m.FabricantesModule) },
  { path: '**', redirectTo: 'produtos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
