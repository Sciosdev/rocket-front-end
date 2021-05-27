import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RegistroTable } from 'src/app/models/registro.table.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  comentario: String;
  selectedDate: Date;
  today: Date;
  row: RegistroTable;
  disabled: boolean = false;
  selectedCourier: any;
  courierFormControl = new FormControl('', Validators.required);
  couriers: any[] = [];
  constructor(protected ref: NbDialogRef<ScheduleComponent>,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.obtenerCouriers().subscribe(
      (resp: any[]) => {
        resp.forEach(element => {
          this.couriers.push(element);
        })
      }
    );

    if (this.row) {
      this.selectedDate = new Date(Date.parse(this.row.scheduledDt.toString()));
      this.comentario = this.row.comment;
    } else {
      this.selectedDate = new Date();
      this.selectedDate.setSeconds(0);
    }

    this.today = new Date();
  }

  cancel() {
    this.ref.close();
  }

  submit(value: any) {
    this.ref.close(value);
  }
}
