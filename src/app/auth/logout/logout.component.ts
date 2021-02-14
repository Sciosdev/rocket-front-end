import { Component, OnInit, Inject } from '@angular/core';
import {
  NbLogoutComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
  NbTokenService,
} from '@nebular/auth';
import { Router } from '@angular/router';
import { UsuarioService } from '../../pages/services/usuario.service';

/**
 * Clase para el cierre de sesión definido en @nebular/auth
 */
@Component({
  selector: 'portal-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})

export class LogoutComponent extends NbLogoutComponent implements OnInit {

/**
 * Constructor de la clase
 */
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService,
    protected usuarioService: UsuarioService,
  ) {
    super(service, Option, router);
  }

  /**
   * Ejecución inicial al hacer el llamado a la clase
   */
  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Método para el cierre de sesión
   */
  logout() {
    const strategy = 'email';
    super.logout(strategy);
    this.tokenService.clear();
    return true;
  }
}
