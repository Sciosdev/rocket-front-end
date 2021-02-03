import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class DummyService {

  URL_SERVICIOS = "http://3.135.222.80:8080";

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
  ) {
    
  }

  obtieneUsuario() {
    const url = this.URL_SERVICIOS + '/rocketAp/getUser';
    return this.http.get(url).pipe(
      map((resp: any) => {
        Swal.fire('Usuario Obtenido', resp.nombre, 'success');
        return resp;
      }),
    );
  }

  
}
