import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  constructor(public http: HttpClient) { }

  URL_SERVICIOS = environment.endpoint;

  obtenerEstatus() {

    const url = this.URL_SERVICIOS + '/estatus/';
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  obtenerEstatusSiguiente(idEstatus: number) {

    const url = this.URL_SERVICIOS + '/estatus/' + idEstatus + '/siguiente/';
    const options = { headers: this.getHeaders() };
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
