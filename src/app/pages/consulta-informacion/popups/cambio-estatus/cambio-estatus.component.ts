import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Estatus } from 'src/app/models/estatus.model';
import { RegistroTable } from 'src/app/models/registro.table.model';
import { EstatusService } from 'src/app/services/estatus.service';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-cambio-estatus',
  templateUrl: './cambio-estatus.component.html',
  styleUrls: ['./cambio-estatus.component.scss']
})

export class CambioEstatusComponent implements OnInit {

  currentEstatus: Estatus;
  registro: RegistroTable;
  selectedEstatus: Estatus;
  estatusFormControl = new FormControl('', Validators.required);
  estatusList: Estatus[] = [];

  constructor(protected ref: NbDialogRef<ScheduleComponent>, protected estatusService: EstatusService) { }

  ngOnInit(): void {

    this.estatusList = [];
    this.estatusService.obtenerEstatusSiguiente(this.currentEstatus.id).subscribe(
      (result: Estatus) => {
        this.estatusList.push(result);
      }
    )
    this.estatusService.obtenerEstatusSiguienteException(this.currentEstatus.id).subscribe(
      (result: Estatus) => {
        this.estatusList.push(result);
      }
    )

    if(!this.currentEstatus){
      this.currentEstatus = {
        desc: 'Sin estatus',
        id: -1,
        siguiente: 0,
        siguienteError: 0,
        tipo: "error" 
      }
    }

  }

  accept() {
    this.ref.close(this.selectedEstatus);
  }

  cancel() {
    this.ref.close();
  }


}
