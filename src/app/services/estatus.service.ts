import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estatus } from '../models/estatus.model';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  constructor(public http: HttpClient) { }

  URL_SERVICIOS = environment.endpoint;

  obtenerEstatus(username: string) {

    const url = this.URL_SERVICIOS + '/estatus/' + username;
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  obtenerEstatusChange(username: string) {

    const url = this.URL_SERVICIOS + '/estatus-change/' + username;
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  obtenerEstatusSiguiente(idEstatus: number) {

    const url = this.URL_SERVICIOS + '/estatus/' + idEstatus + '/siguiente/';
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  
  obtenerEstatusSiguienteException(idEstatus: number) {

    const url = this.URL_SERVICIOS + '/estatus/' + idEstatus + '/siguiente-exception/';
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  actualizarEstatus(estatusDto: Estatus, orderkey: string, user: string) {
    const data = { estatusDto, orderKey: orderkey, user: user}; 
    const url = this.URL_SERVICIOS + '/estatus/';
    const options = { headers: this.getHeaders() };
    return this.http.put(url, data, options);
  }


  private getHeaders() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    });
   
    return headers;
  }
}
