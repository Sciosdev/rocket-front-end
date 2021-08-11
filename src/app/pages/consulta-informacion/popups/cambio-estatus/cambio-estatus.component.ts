import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Estatus } from 'src/app/models/estatus.model';
import { RegistroTable } from 'src/app/models/registro.table.model';
import { TipoEstatus } from 'src/app/models/tipo.estatus.model';
import { EstatusService } from 'src/app/services/estatus.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  selectedCourier: any;
  courierFormControl = new FormControl('', Validators.required);
  courierList: any[] = [];

  constructor(protected ref: NbDialogRef<ScheduleComponent>, protected estatusService: EstatusService, protected usuarioService: UsuarioService) { }

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
      },
      (error) =>  {

      }
    )

    if (!this.currentEstatus) {
      this.currentEstatus = {
        desc: 'Sin estatus',
        id: -1,
        siguiente: 0,
        siguienteError: 0,
        tipo: TipoEstatus.EXCEPCION
      }
    }

    this.courierList = [];

    this.usuarioService.obtenerCouriers().subscribe(
      (response: any[]) => {
        this.courierList =  response;
      },
      (error) => {
        console.warn(error);
      }
    )
    
    this.selectedCourier = this.registro.courier;
  }

  accept() {
    this.ref.close({estatus : this.selectedEstatus, courier: this.selectedCourier});
  }

  cancel() {
    this.ref.close();
  }

  activateReassignCourier(): boolean {

    if (this.currentEstatus.tipo === TipoEstatus.REASIGNACION) {
      return true;
    }

    return false;
  }

}
