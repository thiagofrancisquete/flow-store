import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricantesRoutingModule } from './fabricantes-routing.module';
import { FabricantesComponent } from './fabricantes.component';
import { FabricantesFormComponent } from './fabricantes-form/fabricantes-form.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CoreModule } from 'src/app/core/modules/core/core.module';
import { FabricantesTableComponent } from './fabricantes-table/fabricantes-table.component';
import { FabricantesDialogComponent } from './fabricantes-dialog/fabricantes-dialog.component';

@NgModule({
  declarations: [
    FabricantesComponent,
    FabricantesFormComponent,
    FabricantesTableComponent,
    FabricantesDialogComponent
  ],
  imports: [
    CommonModule,
    FabricantesRoutingModule,
    MaterialModule,
    CoreModule
  ],
  providers: []
})
export class FabricantesModule { }
