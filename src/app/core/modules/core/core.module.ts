import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BotaoComponent } from '../../components/botao/botao.component';
import { CnpjMaskDirective } from '../../directives/cnpj-mask.directive';

@NgModule({
  declarations: [BotaoComponent, CnpjMaskDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BotaoComponent,
    CnpjMaskDirective
  ]
})
export class CoreModule { }
