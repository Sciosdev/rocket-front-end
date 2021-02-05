import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  alive: boolean;
  code: string;
  description: string;

  /**
   * Nombre del archivo cargado
   */
  nombreArchivo = 'Ningún archivo seleccionado';

  /**
   * Auxiliar para mostrar el loader
   */
  loading = false;

  /**
   * Bandera que indica si se obtuvo un resultado
   */
  hasResult = false;

  /**
   * Variable para saber si el salto de linea del archivo es CR
   */
  cr = false;
  /**
   * Variable para saber si el salto de linea del archivo es LF
   */
  lf = false;

  /**
   * Almacena el archvio CSV en JSON
   */
  resultJson: any[] = [];

  /**
   * Json copmo string
   */
  jsonAsText: string;

  constructor(
    private spinner: NgxSpinnerService
  ) {
    this.alive = true;
  }

  test() {
    this.spinner.show();

    this.resultJson.forEach( element => {
      /*this.testService
      .test(element)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );*/
      console.log(element);
    });

    this.spinner.hide();

  }
  ngOnInit() {}
  ngOnDestroy(): void {
    this.alive = false;
  }

  /**
   * Selecciona un archivo de carga
   * @param archivo Archivo CSV con los datos a predecir
   */
  seleccionaArchivo(archivo: File) {
    this.spinner.show();
    this.lf = false;
    this.cr = false;
    if (!archivo) {
      this.resultJson = [];
      this.nombreArchivo = 'Ningún archivo seleccionado';

      return;
    }

    if (archivo.type.indexOf('csv') < 0 && archivo.type.indexOf('excel') < 0) {
      this.resultJson = [];
      this.nombreArchivo = 'Ningún archivo seleccionado';
      return;
    }

    const reader = new FileReader();

    this.resultJson = [];
    reader.onload = () => {
      try {
        const csv: string = reader.result.toString();
        const lfIdx = csv.indexOf('\n');
        const crIdx = csv.indexOf('\r');

        if (lfIdx > 0) {
          this.lf = true;
        }
        if (crIdx > 0) {
          this.cr = true;
        }
        let splitter = '';
        if (this.cr) {
          if (this.lf) {
            splitter = '\r\n';
          } else {
            splitter = '\r';
          }
        } else {
          splitter = '\n';
        }

        const lines = csv.split(splitter);
        const header = lines[0].split(',');
        lines.shift();

        lines.forEach(line => {
          const values = line.split(',');

          if (values.length === header.length) {
            const x = {};
            for (let i = 0; i < values.length; i++) {
              x[header[i].toString()] = values[i];
            }
            this.resultJson.push(x);
          }
        });
      } catch (error) {
        console.warn(error);
       this.spinner.hide();
      }
      this.spinner.hide();
    };

    console.log(this.resultJson);
    reader.readAsText(archivo);
    this.nombreArchivo = archivo.name;
    this.spinner.hide();
  }
}
