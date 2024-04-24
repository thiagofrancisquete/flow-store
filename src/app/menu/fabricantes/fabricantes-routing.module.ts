import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricantesComponent } from './fabricantes.component';
import { FabricantesFormComponent } from './fabricantes-form/fabricantes-form.component';

const routes: Routes = [
  {path: '', component: FabricantesComponent},
  {path: 'cadastrar-fabricante', component: FabricantesFormComponent},
  {path: 'editar-fabricante/:id', component: FabricantesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricantesRoutingModule { }
