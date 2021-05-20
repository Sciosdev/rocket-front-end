import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,  } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.scss']
})
export class CargaArchivoComponent implements OnInit, OnChanges {

  @Output() archivoCargado = new EventEmitter<any>();
  @Output() procesado = new EventEmitter<boolean>();

  /**
   * Nombre del archivo cargado
   */
  nombreArchivo = 'Ningún archivo seleccionado';

  /**
   * Bandera que indica si se obtuvo un resultado
   */
  

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

  fileLoaded:boolean;

  constructor(private stepper: NbStepperComponent) {

  }

  siguiente(){
    this.nombreArchivo = 'Ningún archivo seleccionado';
    this.fileLoaded = false;
    this.stepper.next();
  }

  ngOnChanges(): void {

    if(!this.fileLoaded){
      this.nombreArchivo = 'Ningún archivo seleccionado';
    }
  }

  ngOnInit() {
    this.hasHeader = false;
    this.fileLoaded = false;
    //console.log("OnInit");
  }



  setHasHeader(hasHeader: boolean) {
    this.hasHeader = hasHeader;
  }

  readExcel(event) {

    if (!event.target.files[0]) {
      this.resultJson = [];
      this.nombreArchivo = 'Ningún archivo seleccionado';
      console.error("no se cargo el archivo")
      Swal.fire('Error al cargar', 'Ocurrió un error al cargar el archivo', 'error');
      return;
    }
   
    const target: DataTransfer = <DataTransfer>(event.target);
    
    if (target.files.length !== 1) {
      this.resultJson = [];
      this.nombreArchivo = 'Ningún archivo seleccionado';
      Swal.fire('Error al cargar', 'No se puede cargar más de un archivo', 'error');
      throw new Error('Cannot use multiple files');
    }

    console.log(target.files[0].type);
    if (target.files[0].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && target.files[0].type != 'application/vnd.ms-excel'){
      this.resultJson = [];
      this.nombreArchivo = 'Ningún archivo seleccionado';
      Swal.fire('Error al cargar', 'Por favor seleccione el tipo de archivo correcto (.xlsx, .csv)', 'error');
      return;
    }

    this.fileLoaded = true;
    this.nombreArchivo = target.files[0].name;
    this.archivoCargado.emit(target.files[0]);
    this.procesado.emit(false);

  }

}