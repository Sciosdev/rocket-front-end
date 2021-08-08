import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-resultado-consulta-usuarios',
  templateUrl: './resultado-consulta-usuarios.component.html',
  styleUrls: ['./resultado-consulta-usuarios.component.scss']
})
export class ResultadoConsultaUsuariosComponent implements OnInit {

  @Input() registros: Usuario[];

  columns: any[] = [];
  defaultColumns = ['Nombre'];


  dataSource: MatTableDataSource<Usuario>;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.registros);
    console.log("Estoooooy en ngOnInit"+this.registros);

    this.columns = [];
    this.columns.push(...this.defaultColumns);
  }

  ngOnChanges(): void {
    console.log("Estoooooy en ngOnChange"+this.registros);
    this.dataSource = new MatTableDataSource(this.registros);
    console.log("Soy dataSource" + this.dataSource);

    this.columns = [];
    this.columns.push(...this.defaultColumns);
  }

}
