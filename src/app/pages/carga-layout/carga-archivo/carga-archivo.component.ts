import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.scss']
})
export class CargaArchivoComponent implements OnInit {

  @Output() archivoCargado = new EventEmitter<any>();

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


  constructor() {

  }

  ngOnInit() {
    this.hasHeader = false;
    this.fileLoaded = false;
  }

  setHasHeader(hasHeader: boolean) {
    this.hasHeader = hasHeader;
  }

  readExcel(event) {

    if (!event.target.files[0]) {
      this.resultJson = [];
      this.nombreArchivo = 'Ningún archivo seleccionado';
      console.error("no se cargo el archivo")
      return;
    }
   
    const target: DataTransfer = <DataTransfer>(event.target);
    
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    this.fileLoaded = true;
    this.nombreArchivo = target.files[0].name;
    this.archivoCargado.emit(target.files[0]);

  }

}