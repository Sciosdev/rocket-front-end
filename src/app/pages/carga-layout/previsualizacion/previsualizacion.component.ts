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
  resultJson: any;
  prevRows: any[];
  headerExcel: any[];
  procesado: boolean;
  constructor() { }

  ngOnInit(): void {
    this.procesado = false;
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

            row.eachCell(function (cell, colNumber) {
              var header = worksheet.getRow(2).getCell(colNumber).value;
              var type = map[header].type;
              var id = map[header].column_id;

              if (rowNumber > 2) {
                registro[type][id] = cell.value;
                registro.row_number = rowNumber - 2;
              }
            });
            resultado.push(registro);
          });
        });
    });
    this.resultJson = {};
    this.resultJson.registro_id = resultado;
    this.procesado = true;
    console.log(this.resultJson);
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
            let registro: any = {};
            if (rowNumber < 6) {
              row.eachCell(function (cell, colNumber) {

                let header = "Columna " + colNumber;
                let field = "column" + colNumber;


                registro[field] = cell.value;

                if (rowNumber == 2) {

                  let aux: any = {}
                  aux.header = header;
                  aux.field = field;
                  headerEx.push(aux);
                }
              });

              resultado.push(registro);

            }
          });
        });
    });
    this.prevRows = resultado;
    this.headerExcel = headerEx;
  }

}
