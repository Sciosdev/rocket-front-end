import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.scss']
})
export class CargaArchivoComponent implements OnInit {

  @Output() archivoCargado = new EventEmitter<any[]>();
  @Output() indices = new EventEmitter<any>();
  @Output() header = new EventEmitter<any>();

  /**
   * Nombre del archivo cargado
   */
  nombreArchivo = 'Ningún archivo seleccionado';

  /**
   * Bandera que indica si se obtuvo un resultado
   */
  fileLoaded = false;

  hasHeader: boolean;

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


  validSelection = false;

  constructor() {

  }

  ngOnInit() {
    this.hasHeader = false;
    this.fileLoaded = false;
  }

  seleccionaArchivo(archivo: File) {
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
    const indices = [];
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
        let header = [];

        if (this.hasHeader) {
          header = lines[0].split(',');
          const n = lines[0].split(',').length;
          for (let i = 0; i < n; i++) {
            header[i] = i.toString();
            indices[i] = i;
          }

          lines.shift();
        } else {
          const n = lines[0].split(',').length;
          for (let i = 0; i < n; i++) {
            header.push(i.toString());
            indices[i] = i;
          }
        }

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

        this.indices.emit(indices);
        this.header.emit(header);

      } catch (error) {
        console.warn(error);
        this.fileLoaded = false;
      }
      this.fileLoaded = true;
    };

    reader.readAsText(archivo);
    this.nombreArchivo = archivo.name;

    this.archivoCargado.emit(this.resultJson);
  }

  setHasHeader(hasHeader: boolean) {
    this.hasHeader = hasHeader;
  }


}