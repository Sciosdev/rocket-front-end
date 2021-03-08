import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado-consulta',
  templateUrl: './resultado-consulta.component.html',
  styleUrls: ['./resultado-consulta.component.scss']
})
export class ResultadoConsultaComponent implements OnInit {

  @Input() registros: any[];

  columns = ['OrderKey', 'Name', 'Email', 'Shipping City', 'Shipping Address 1', 'Shipping Address 2', 'Status', 'CargaDT'];
  constructor() { }

  ngOnInit(): void {
  }

}
