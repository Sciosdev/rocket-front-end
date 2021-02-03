import { Injectable, NgZone } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth';
import { CargaArchivosService } from './carga-archivos.service';
import Swal from 'sweetalert2';

/**
 * Servicio de usuarios
 */
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  /**
   * Usuario en sesion
   */
  usuario: Usuario = null;
  /**
   * Token del usuario
   */
  token: string = null;

  /**
   * Url de servicios de autenticacion
   */
  URL_SERVICIOS = "http://localhost:4000";

  /**
   * Constructor de la clase
   * @param http Cliente http
   * @param router Intancia del router
   * @param _ngZone NgZone
   * @param _subirArchivoService Servicio para subir imagenes de perfil
   * @param authService Servicio de autenticacion
   * @param tokenService Servicio de token
   */
  constructor(
    public http: HttpClient,
    public router: Router,
    public _ngZone: NgZone,
    public _subirArchivoService: CargaArchivosService,
    private authService: NbAuthService,
    protected tokenService: NbTokenService,
  ) {
    this.cargaInformacion();
  }

  /**
   * Valida si el usuario tiene sesion iniciada
   */
  estaLogueado() {
    this.token = null;
    this.token = localStorage.getItem('token');
    return this.token === null ? false : this.token.length > 5 ? true : false;
  }

  /**
   * Carga la informacion del usuario al aplicativo
   */
  cargaInformacion() {
    if (!this.estaLogueado()) {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.usuario = token.getPayload().usuario;
          this.token = token.getValue();
          this.guardarInformacion(this.token, this.usuario);
        }
      });
    } else {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
    }
  }

  /**
   * Guarda la informacion del usuario en el Local Storage
   * @param id Id del usuario
   * @param token Token del usuario
   * @param usuario Usuario
   */
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  /**
   * Guarda la informacion del usuario en el Local Storage
   * @param token Token de usuario
   * @param usuario Usuario
   */
  guardarInformacion(token: string, usuario: Usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  /**
   * Cierre de sesion
   */
  logout() {
    this.usuario = null;
    this.token = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    const strategy = 'email';
    this.authService.logout(strategy).subscribe(() => {});
    this.tokenService.clear();
    return true;
  }

  /**
   * Inicio de sesion con google
   * @param token Token de usuario
   */
  loginGoogle(token: string) {
    const url = this.URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }),
    );
  }

  /**
   * Inicio de sesion normal
   * @param usuario Usuario
   * @param recuerdame Bandera para recordar al usuario
   */
  login(usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = this.URL_SERVICIOS + '/api/auth';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        return true;
      }),
    );
  }

  /**
   * Registra un usuario en la base de datos
   * @param usuario Usuario a dar de alta
   */
  crearUsuario(usuario: Usuario) {
    const url = this.URL_SERVICIOS + '/api/auth/new';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire('Usuario Creado ', usuario.email, 'success');
        return resp.usuario;
      }),
    );
  }

  /**
   * Actualiza la informacion de un usuario en la base de datos
   * @param usuario Usuario con la informacion a actualizar
   */
  actualizarUsuario(usuario: Usuario) {
    let url = this.URL_SERVICIOS + '/usuario' + '/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire('Usuario Actualizado ', 'Vuelva a iniciar sesión', 'success');
        return true;
      }),
    );
  }

  /**
   * Cambia la imagen del usuario
   * @param file Imagen del usuario
   * @param id Id del usuario
   */
  cambiarImagen(file: File, id: string) {
    this._subirArchivoService
      .subirArchivo(file, id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen Actualizada', this.usuario.name, 'success');
        this.guardarInformacion(this.token, this.usuario);
      })
      .catch(resp => {});
  }
}
