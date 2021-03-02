import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbTokenService, NbAuthService, NbAuthToken } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})

export class RegistroService {

  URL_SERVICIOS = "https://18.221.76.172:8443";

  constructor(public http: HttpClient,
              public tokenService: NbTokenService,
              public authService: NbAuthService) { }

  registrarCarga(data:any) {
  
    const url = this.URL_SERVICIOS + '/rocket-back-end-qa/registrar';
    return this.http.post(url,data,this.getOptions());
  }

  private getOptions(){
     
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    'Accepts': 'application/json'},);
     let options = { headers: headers };
    return options;
      }
}
