import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { EstatusService } from 'src/app/services/estatus.service';
import { RolesService } from 'src/app/services/roles.service';
import { EventEmitter, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-filtro-consulta',
  templateUrl: './filtro-consulta.component.html',
  styleUrls: ['./filtro-consulta.component.scss']
})
export class FiltroConsultaComponent implements OnInit {

  isAdmin: boolean;
  selectedRolUsuario;
  selectedUsuario;

  adminFormControl = new FormControl('', Validators.required);
  usuarioFormControl = new FormControl('', Validators.required);
  
  estatus: any[] = [];
  roles_combo: any[] = [];
  usuarios_combo: any[] = [];

  @Output() rol: any = new EventEmitter<String>();
  

  constructor(
    public accessChecker: NbAccessChecker, 
    private authService: NbAuthService,
    private rolesService: RolesService,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    
    this.authService.isAuthenticatedOrRefresh().subscribe(
      authenticated => {
        if (authenticated) {
          this.authService.getToken().subscribe(
            (token: NbAuthOAuth2JWTToken) => {
              if (token.isValid()) {
                let user = token.getAccessTokenPayload();
                this.loggedUser = user.user_name;
                this.isAdmin = this.hasAccess('filtro', ['admin']);
              }
            }
          );
        }
      }
    );

    this.rolesService.obtenerRoles().subscribe(
      (resp: any[]) => {
        resp.forEach(element => {
          this.roles_combo.push(element);
        })
      }
    );
  }

  ngOnChanges(): void {
    this.authService.isAuthenticatedOrRefresh().subscribe(
      authenticated => {
        if (authenticated) {
          this.authService.getToken().subscribe(
            (token: NbAuthOAuth2JWTToken) => {
              if (token.isValid()) {
                let user = token.getAccessTokenPayload();
                this.loggedUser = user.user_name;
                this.isAdmin = this.hasAccess('filtro', ['admin']);
              }
            }
          );
        }
      }
    );
      
  }

  loggedUser: any;

  hasAccess(permission, resources: any[]) {
    let access = false;
    resources.forEach(element => {
      this.accessChecker.isGranted(permission, element).subscribe(granted => {
        if (granted)
          access = true;
      });
    });

    return access;
  }

  validateInput() {
    
    //return this.adminFormControl.hasError("required");
    
  }

  obtenerUsuarios() {

    if(!this.selectedRolUsuario)
      this.selectedRolUsuario = null;
    
    this.rol.emit(this.selectedRolUsuario);

    console.log(this.selectedRolUsuario);

    if(this.selectedRolUsuario === null) {
      this.usuarioService.obtenerUsuarios().subscribe(
        (resp: any[]) => {
          resp.forEach(element => {
            this.usuarios_combo.push(element);
          })
        }
      );
    } else {
      this.usuarioService.obtenerUsuariosPorRol(this.selectedRolUsuario).subscribe(
        (resp: any[]) => {
          resp.forEach(element => {
            this.usuarios_combo.push(element);
          })
        }
      );
    }
    
  }

}
