import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
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

  @Output() loading: any = new EventEmitter<boolean>();
  @Output() registros: any = new EventEmitter<Usuario[]>();
  @Output() registrosCompletos: any = new EventEmitter<UsuarioCompleto[]>();

  constructor(protected ref: NbDialogRef<ModificarUsuarioComponent>,
    private usuarioService: UsuarioService,
    private toastrService: NbToastrService

  ) { }

  ngOnInit(): void {

  }

  accept() {
    this.loading.emit(true);
    this.usuario.name = this.usuario.firstName + ' ' + this.usuario.lastName + ' ' + this.usuario.secondLastName;

    /* BLOQUE DE LLAMADO AL SERVICIO PARA ACTUALIZAR */
    this.usuarioService.actualizarUsuarios(this.usuario).subscribe(
      (resp: Usuario[]) => {
        this.loading.emit(false);
        this.toastrService.success('Se actualizó correctamente el usuario: ' + this.usuario.firstName, 'Actualización de usuario');
      }, (error) => {
        this.loading.emit(false);
        this.toastrService.danger('Ocurrió un error al actualizar el usuario: ' + this.usuario.firstName, 'Actualización de usuario');
      }
    );

    this.ref.close({ accepted: true, usuario: this.usuario });
  }

  cancel() {
    this.ref.close({ accepted: false });
  }

}
