import { Injectable } from '@angular/core';
/**
 * Servicio para la carga de foto de perfil
 */
@Injectable({
  providedIn: 'root',
})
export class CargaArchivosService {

  /**
   * Url de los servicios de autenticacion
   */
  URL_SERVICIOS = "http://localhost:3000";

  /**
   * Función para la carga de fotos de perfil
   * @param archivo Foto de perfil
   * @param id Id de usuario
   */
  subirArchivo(archivo: File, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = this.URL_SERVICIOS + '/upload/usuarios/' + id;

      xhr.open('PUT', url, true);

      xhr.send(formData);
    });
  }
}
