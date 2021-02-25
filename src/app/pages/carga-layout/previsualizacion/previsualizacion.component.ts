import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { layout_map } from 'src/app/schemas/layout.schema';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { NbStepperComponent } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import { map, tap } from 'rxjs/operators';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
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
    private registrorService: RegistroService,
    private authService: NbAuthService) { }

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

    // console.log(await this.processExcel());
    /* var data = this.processExcel();
    data.then(result => {
      var jsonArray = new Array(result.length);
      var index = 0;
      result.forEach(data => {
        jsonArray[index] = data;
        index++;
      })
      console.log(jsonArray);

      this.registerTest( result );
    }) */

    /*  var jsonArray = new Array(resultado.length);
     var index = 0;
     resultado.forEach(data => {
       jsonArray[index] = data;
       index++;
     })
 
     let data = { "registro_id" : jsonArray };
     //let json = `[${resultado}]`
     console.log(resultado);
     console.log(data);
     console.log(JSON.stringify(data));
     this.registerTest(data); */
  }

  async processExcel() {
    let resultado: any[] = [];
    const map = layout_map;
    const workbook = new Excel.Workbook();

    this.nombreArchivo = this.archivoCargado.name;

    const arryBuffer = new Response(this.archivoCargado).arrayBuffer();

    arryBuffer.then(function (data) {
      let other;

      (async () => {
        var promise1 = new Promise(function (resolve, reject) {
          resolve(workbook.xlsx.load(data)
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
                    registro["row_number"] = rowNumber - 2;
                  }
                });
                if (rowNumber > 2)
                  resultado.push(registro);
              });
              console.log("1: " + resultado);
              return resultado;
            }));
        });

        var thenedPromise = promise1.then(function (value) {
          other = value;
          console.log("2: " + value); // this logs "foo"
        });

        await thenedPromise;

        console.log("3: " + other);

        return other;
      })();
      return other;
    }).then((e) => {
      console.log("4: " + e);
    });

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
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];


      this.jsontext = XLSX.utils.sheet_to_json<string>(worksheet, { raw: true, range: 1 });

    }

    fileReader.onloadend = (e) => {

      this.flag = true;
      console.log(this.jsontext);

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

          console.log(key);

          var type = map[key].type;
          var id = map[key].column_id;

          registro[type][id] = json[key];

        }

        registro["rowNumber"] = rowNumber;
        rowNumber++;
        result.push(registro);
      });

      let peticion = {registro_id : result}
      this.registerTest(JSON.stringify(peticion));
    }
  }

  public registerTest(data) {
    console.log(JSON.stringify(data));
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
        Swal.fire('Error', 'Ocurrio un error inesperado', 'error')
      });

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
