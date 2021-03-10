import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbTokenService, NbAuthService, NbAuthToken } from '@nebular/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegistroService {

  URL_SERVICIOS = environment.endpoint;

  constructor(public http: HttpClient,
    public tokenService: NbTokenService,
    public authService: NbAuthService) { }

  registrarCarga(data: any) {

    const url = this.URL_SERVICIOS + '/registro';
    const options = { headers: this.getHeaders() };
    return this.http.post(url, data, options);
  }

  obtenerRegistros(user: any, estatus: number) {

    const url = this.URL_SERVICIOS + '/registro/' + user;
    const httpParams: HttpParamsOptions = { fromObject: {estatus: estatus.toString()} } as HttpParamsOptions;

    const options = { params: new HttpParams(httpParams), headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  obtenerRegistrosPorFecha(user: any, fDate: Date, tDate: Date, estatus: number) {

    const url = this.URL_SERVICIOS + '/registro-fecha/' + user;

    const httpParams: HttpParamsOptions = { fromObject: {from: fDate.toDateString(), to: tDate.toDateString(), estatus: estatus.toString()} } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.getHeaders() };
    return this.http.get(url, options);

  }


  private getHeaders() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    });
   
    return headers;
  }
}
