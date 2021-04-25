import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbTokenService, NbAuthService, NbAuthToken } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { Registro } from '../models/registro.model';
import { ScheduleServiceInDto } from '../models/ScheduleServiceInDto.model';

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

    const url = this.URL_SERVICIOS + '/registro/list/' + user;
    const httpParams: HttpParamsOptions = { fromObject: {estatus: estatus.toString()} } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  obtenerRegistrosPorFecha(user: any, fDate: Date, tDate: Date, estatus: number) {

    const url = this.URL_SERVICIOS + '/registro/list/' + user;

    const httpParams: HttpParamsOptions = { fromObject: {from: fDate.toDateString(), to: tDate.toDateString(), estatus: estatus.toString()} } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.getHeaders() };
    return this.http.get(url, options);

  }

  obtenerRegistrosPorIds(registroIds: any){
    const url = this.URL_SERVICIOS + '/registro/list/';

    const httpParams: HttpParamsOptions = { fromObject: { "registroIds": registroIds} } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: this.getHeaders() };
    return this.http.get(url, options);
  }

  obtenerRegistroPorId(registroId: String){
    const url = this.URL_SERVICIOS + '/registro/' + registroId;
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);
  }

  actualizarRegistros(data: ScheduleServiceInDto[]) {

    const url = this.URL_SERVICIOS + '/registro';
    const options = { headers: this.getHeaders() };
    return this.http.put(url, data, options);
  }

  aceptarAgenda(data: ScheduleServiceInDto[]){
    const url = this.URL_SERVICIOS + '/registro/agenda/aceptar';
    const options = { headers: this.getHeaders() };
    return this.http.put(url, data, options);
  }
 
  rechazarAgenda(data: ScheduleServiceInDto[]){
    const url = this.URL_SERVICIOS + '/registro/agenda/rechazar';
    const options = { headers: this.getHeaders() };
    return this.http.put(url, data, options);
  }

  obtenerEtiqueta(orderKey: String){
    const url = this.URL_SERVICIOS + '/api/registro/' + orderKey + '/etiqueta';
   
    let headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accepts': 'application/pdf'
    });

    const options = {headers: headers, responseType: 'blob'  };

    return this.http.get(url, {responseType: 'blob'});
  }

  private getHeaders() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    });
   
    return headers;
  }
}
