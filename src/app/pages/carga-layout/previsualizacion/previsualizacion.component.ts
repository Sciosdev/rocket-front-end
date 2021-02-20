import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { layout_map } from 'src/app/schemas/layout.schema';
import * as Excel from 'exceljs/dist/exceljs.min.js';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.scss']
})
export class PrevisualizacionComponent implements OnInit, OnChanges  {
 
  @Input() archivoCargado:any;

  nombreArchivo:string;

  resultJson:any[];
  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnChanges(): void {
    if(!this.archivoCargado){
      return;
    } 
    console.log(this.archivoCargado);
    this.processExcel();
  }

  processExcel() {
    let resultado:any[] = [];
    const map = layout_map;
    const workbook = new Excel.Workbook();

    this.nombreArchivo = this.archivoCargado.name;
   
    

    /**
     * Final Solution For Importing the Excel FILE
     */

    const arryBuffer = new Response(this.archivoCargado).arrayBuffer();

    arryBuffer.then(function (data) {
      workbook.xlsx.load(data)
        .then(function () {
          const worksheet = workbook.worksheets[0];
          worksheet.eachRow(function (row, rowNumber) {
            let registro: any = {
              "id":"",
              "order":{},
              "billing_address":{},
              "shipping_address":{},
              "payment":{},
              "extra":{}
            };
            registro.id = rowNumber;
            row.eachCell(function(cell, colNumber) {
              var header = worksheet.getRow(2).getCell(colNumber).value;
              var type = map[header].type;
              var id = map[header].column_id;
              registro[type][id] = cell.value;
            });
            console.log(registro);
            resultado.push(registro);
          });
          console.log(resultado);
        });
    });
    this.resultJson = resultado;
    console.log(this.resultJson);

  }

}
