import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { layout_map } from 'src/app/schemas/layout.schema';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { NbStepperComponent } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.scss']
})
export class PrevisualizacionComponent implements OnInit, OnChanges {

  public load = false;
  public flag = false;
  public arrayBuffer;
  public jsontext: any[];

  @Input() archivoCargado: any;
  @Output() resultado: any = new EventEmitter<any>();;

  nombreArchivo: string;
  resultJson: any;
  prevRows: any[];
  headerExcel: any[];
  procesado: boolean;
  constructor(private stepper: NbStepperComponent,
    private registrorService: RegistroService) { }

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

  register() {
    this.excelToJson();
  }

  reiniciar() {
    this.procesado = false;
  }

  public excelToJson() {
    this.flag = false;
    const map = layout_map;
    let result = [];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.archivoCargado);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];


      this.jsontext = XLSX.utils.sheet_to_json<string>(worksheet, { raw: true, range: 1 });

    }

    fileReader.onloadend = (e) => {

      this.flag = true;

      let rowNumber = 1;
      this.jsontext.forEach(json => {

        let registro: any = {
          "rowNumber": "",
          "order": {},
          "billing_address": {},
          "shipping_address": {},
          "payment": {},
          "extra": {}
        };

        for (var key in json) {

          var type = map[key].type;
          var id = map[key].column_id;
          var value;

          if (id === "created_at" || id === "paid_at" || id === "fulfilled_at" || id === "cancelled_at")
            value = new Date(json[key]).getTime();
          else
            value = json[key];
          registro[type][id] = value;
        }
        registro["rowNumber"] = rowNumber;
        rowNumber++;
        result.push(registro);
      });

      let peticion = { registro_id: result }
      this.registerTest(JSON.stringify(peticion));
    }
  }

  public registerTest(data) {
    this.load = true;
    this.procesado = true;
    this.registrorService.registrarCarga(data).subscribe(

      (ret) => {
        console.log('Test API OK: ', ret);
        this.load = false;
        this.stepper.next();
        this.resultado.emit(ret);
      },
      (error) => {
        console.error('An error occurred: ', error);
        this.load = false;
        Swal.fire('Error', 'El archivo no cumple con el formato, por favor revise que contenga toda la información e intente nuevamente', 'error')
      });
  }

  previewData() {
    let resultado: any[] = [];
    let headerEx: any[] = [];
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
