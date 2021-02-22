import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { layout_map } from 'src/app/schemas/layout.schema';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.scss']
})
export class PrevisualizacionComponent implements OnInit, OnChanges {

  @Input() archivoCargado: any;

  nombreArchivo: string;

  resultJson: any[];
  prevRows: any[];
  datasource;
  headerExcel: any[];
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (!this.archivoCargado) {
      return;
    }
    console.log(this.archivoCargado);
    this.previewData();
  }

  processExcel() {
    let resultado: any[] = [];
    let headerEx: any[] = [];
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
              "row_number": "",
              "order": {},
              "billing_address": {},
              "shipping_address": {},
              "payment": {},
              "extra": {}
            };
            registro.row_number = rowNumber;
            row.eachCell(function (cell, colNumber) {
              var header = worksheet.getRow(2).getCell(colNumber).value;
              var type = map[header].type;
              var id = map[header].column_id;

              if (rowNumber > 2) {
                registro[type][id] = cell.value;
              }
              if (rowNumber == 2) {

                headerEx.push({ header });
              }
            });
            resultado.push(registro);
          });
        });
    });
    this.resultJson = resultado;
    this.headerExcel = headerEx;
    this.datasource = new MatTableDataSource(this.resultJson);
  }

  previewData() {
    let resultado: any[] = [];
    let headerEx: any[] = [];
    const map = layout_map;
    const workbook = new Excel.Workbook();

    this.nombreArchivo = this.archivoCargado.name;

    const arryBuffer = new Response(this.archivoCargado).arrayBuffer();

    arryBuffer.then(function (data) {
      workbook.xlsx.load(data)
        .then(function () {
          const worksheet = workbook.worksheets[0];

          worksheet.eachRow(function (row, rowNumber) {
            let registro: any = {
              "row_number": "",
              "order": {},
              "billing_address": {},
              "shipping_address": {},
              "payment": {},
              "extra": {}
            };
            if(rowNumber < 8) {
              registro.row_number = rowNumber - 2;
              row.eachCell(function (cell, colNumber) {

              let header = worksheet.getRow(2).getCell(colNumber).value;
              var type = map[header].type;
              let field = map[header].column_id;

              if (rowNumber > 2) {
                registro[type][field] = cell.value;
              }
              if (rowNumber == 2) {

              let aux: any = {}
              aux.header = header;
              aux.field = field;
              aux.type = type;
              headerEx.push(aux);
              }
            });

            if(rowNumber > 2){
              resultado.push(registro);
            }
          }
          });
        });
    });
    this.prevRows = resultado;
    this.headerExcel = headerEx;
  }

}
