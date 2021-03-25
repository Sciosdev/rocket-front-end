import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { layout_map } from 'src/app/schemas/layout.schema';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { NbStepperComponent } from '@nebular/theme';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { NbAuthJWTToken, NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';

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
  public erroresArr: any[] = [];
  public user;

  @Input() archivoCargado: any;
  @Output() resultado: any = new EventEmitter<any>();;
  @Output() errores: any = new EventEmitter<any[]>();

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
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        if (token.isValid()) {
          this.user = token.getAccessTokenPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
        }
      });
  }

  ngOnChanges(): void {
    if (!this.archivoCargado) {
      return;
    }
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
      let errors: any[] = [];
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

        let response = this.validateRequiredAnNullable(json);

        if (response.error) {
          errors.push({ rowNumber: rowNumber, errors: response.columns });
          rowNumber++;
        } else {
          for (var key in json) {
            try {

              if (Object.keys(layout_map).includes(key)) {

                var type = map[key].type;
                var id = map[key].column_id;
                var value;

                if (id === "created_at" || id === "paid_at" || id === "fulfilled_at" || id === "cancelled_at")
                  value = new Date(json[key]).getTime();
                else
                  value = json[key];
                registro[type][id] = value;
              }

            } catch (e) {
              console.error(e);
            }
          }
          registro["rowNumber"] = rowNumber;
          rowNumber++;

          result.push(registro);
        }

      });

      this.errores.emit(errors);
      let peticion = { registro: result, idVendor: this.user.user_name }
      this.registerTest(JSON.stringify(peticion));
    }
  }

  private validateRequiredAnNullable(json) {
    let reqArray = [];
    let leftColumns = [];
    let hasErrors = false;

    Object.keys(layout_map).forEach(key => {
      if (layout_map[key].required && !layout_map[key].nullable)
        reqArray.push(key);
    });

    reqArray.forEach(key => {
      if (!Object.keys(json).includes(key)) {
        leftColumns.push(key);
        hasErrors = true;
      }
    });


    return { error: hasErrors, columns: leftColumns };

  }

  public registerTest(data) {
    this.load = true;
    this.procesado = true;
    this.registrorService.registrarCarga(data).subscribe(

      (ret) => {
        this.load = false;
        this.stepper.next();
        this.resultado.emit(ret);
      },
      (error) => {
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
