import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-informacion',
  templateUrl: './consulta-informacion.component.html',
  styleUrls: ['./consulta-informacion.component.scss']
})
export class ConsultaInformacionComponent implements OnInit {

  constructor() { }

  registros: any[];
  loading: boolean;

  ngOnInit(): void {
  }
  setRegistros($event) {
    this.registros = $event;
  }
  setLoading($event) {
    this.loading = $event;
  }
  
}
