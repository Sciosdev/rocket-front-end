import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-layout',
  templateUrl: './carga-layout.component.html',
  styleUrls: ['./carga-layout.component.scss']
})
export class CargaLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  archivoCargado:any;
  resultado: any;

  setArchivoCargado($event) {
    this.archivoCargado = $event;
  }

  setResultado($event) {
    this.resultado = $event;
  }
}
