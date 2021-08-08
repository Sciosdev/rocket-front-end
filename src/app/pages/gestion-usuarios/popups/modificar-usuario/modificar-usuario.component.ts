import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UsuarioCompleto } from 'src/app/models/usuario-completo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  usuario: UsuarioCompleto;
  constructor(protected ref: NbDialogRef<ModificarUsuarioComponent>
  ) { }

  ngOnInit(): void {

  }

  accept() {

    this.usuario.name = this.usuario.firstName + ' ' + this.usuario.lastName + ' ' + this.usuario.secondLastName;

    /* BLOQUE DE LLAMADO AL SERVICIO PARA ACTUALIZAR */

    this.ref.close({ accepted: true, usuario: this.usuario });
  }

  cancel() {
    this.ref.close({ accepted: false });
  }

}
