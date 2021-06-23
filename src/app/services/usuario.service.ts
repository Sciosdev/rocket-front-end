import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  URL_SERVICIOS = environment.endpoint;

  constructor(public http: HttpClient,
    public tokenService: NbTokenService,
    public authService: NbAuthService) { }


  obtenerRepartidores() {

    const url = this.URL_SERVICIOS + '/repartidor';
    return this.http.get(url, this.getOptions());

  }
  obtenerVendedores() {

    const url = this.URL_SERVICIOS + '/vendedor';
    return this.http.get(url, this.getOptions());

  }

  obtenerCouriers() {

    const url = this.URL_SERVICIOS + '/courier';
    return this.http.get(url, this.getOptions());

  }

  private getOptions() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    });
    let options = { headers: headers };
    return options;
  }
}
