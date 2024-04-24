import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.scss']
})
export class BotaoComponent {

  @Input() texto: string = '';
  @Input() tipo: string = '';
  @Input() disabled: boolean = false;

}
