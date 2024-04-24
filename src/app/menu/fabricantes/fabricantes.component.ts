import { FabricantesService } from './../../services/fabricantes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.scss']
})
export class FabricantesComponent implements OnInit{

  constructor(private fabricantesService: FabricantesService) {}

  ngOnInit(): void {
  }

}
