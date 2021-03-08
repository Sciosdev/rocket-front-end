import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { RegistroService } from 'src/app/services/registro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Output() registros: any = new EventEmitter<any[]>();

  users_combo:any[] = [];

  constructor(public accessChecker: NbAccessChecker,
             private authService: NbAuthService,
             private registroService: RegistroService,
             private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obtenerRepartidores().subscribe(
      (resp:any[]) => {
        resp.forEach(element => {
          this.users_combo.push(element);
        })
      }
    );
    this.usuarioService.obtenerVendedores().subscribe(
      (resp:any[]) => {
        resp.forEach(element => {
          this.users_combo.push(element);
        })
      }
    );

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          let user = token.getPayload();
          this.loggedUser = user.usuario;
        }

      });
  }

  loggedUser:any;

  hasAccess(permission, resources:any[]){
    let access = false;
     resources.forEach(element => {   
        this.accessChecker.isGranted(permission, element).subscribe(granted => {
          if(granted)
            access = true;
        });
      });

      return access;
  }

  obtenerRegistros(){
    this.registroService.obtenerRegistros(this.loggedUser).subscribe(
      response => {
        this.registros.emit(response);
      }
    )
  }
}
