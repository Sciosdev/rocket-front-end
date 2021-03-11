import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resultado-consulta',
  templateUrl: './resultado-consulta.component.html',
  styleUrls: ['./resultado-consulta.component.scss']
})
export class ResultadoConsultaComponent implements OnInit, OnChanges, AfterViewInit  {

  @Input() registros: any[];

  columns = ['OrderKey', 'Name', 'Email', 'Shipping City', 'Shipping Address 1', 'Shipping Address 2', 'Status', 'CargaDT'];
  
  displayedColumns: string[] = this.columns;
  dataSource;
  
  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
  }

  ngOnChanges(): void{
    this.dataSource = new MatTableDataSource(this.registros);
    this.dataSource.paginator = this.paginator;
  }

}
