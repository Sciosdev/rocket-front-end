import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogRef } from '@nebular/theme';
import { UsuarioCompleto } from 'src/app/models/usuario-completo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TiendaService } from 'src/app/services/tienda.service';
import { RocketPatterns } from 'src/app/utils/patterns';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss'],
})
export class ModificarUsuarioComponent implements OnInit {
  usuario: UsuarioCompleto;
  blocked: boolean = false;
  tiendas_combo: any[] = [];
  nombreTienda;
  imagePath;

  emailPattern = RocketPatterns.email;
  passwordPattern = RocketPatterns.password;
  namePattern = RocketPatterns.personalName;
  zipPattern = RocketPatterns.zipCode;
  phoneNumberPattern = RocketPatterns.phoneNumber;

  @Output() loading: any = new EventEmitter<boolean>();
  @Output() registros: any = new EventEmitter<Usuario[]>();
  @Output() registrosCompletos: any = new EventEmitter<UsuarioCompleto[]>();

  constructor(
    protected ref: NbDialogRef<ModificarUsuarioComponent>,
    private _sanitizer: DomSanitizer,
    private tiendaService: TiendaService
  ) {}

  ngOnInit(): void {

    if(this.usuario.fullAddress == undefined){
      this.usuario.fullAddress = {};
    }

    this.nombreTienda = 'Sin tienda asignada';

    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.usuario.foto
    );

    this.tiendaService.obtenerCatalogoTiendas().subscribe((tiendas: any[]) => {
      this.tiendas_combo = tiendas;
      if (this.usuario.tienda) {
        this.tiendas_combo.forEach((tienda) => {
          if (tienda.id == this.usuario.tienda)
            this.nombreTienda = tienda.nombreTienda;
        });
      }
    });
  }

  accept() {
    this.loading.emit(true);
    this.usuario.name = '';

    if (this.usuario.firstName)
      this.usuario.name = this.usuario.name.concat(this.usuario.firstName);

    if (this.usuario.lastName)
      this.usuario.name = this.usuario.name.concat(' ', this.usuario.lastName);

    if (this.usuario.secondLastName)
      this.usuario.name = this.usuario.name.concat(
        ' ',
        this.usuario.secondLastName
      );

    if (this.usuario.foto) {
      if (this.usuario.foto == 'nofoto') this.usuario.foto = null;
    } 

    this.ref.close({ accepted: true, usuario: this.usuario, tienda: null });
  }

  cancel() {
    this.ref.close({ accepted: false });
  }

  myUploader(event, form) {
    for (const file of event.files) {
      this.readFile(file);
    }
    form.clear();
  }

  onBeforeUpload() {
    this.blocked = true;
  }

  onUpload() {
    this.blocked = false;
  }

  deleteFoto() {
    this.usuario.foto = 'nofoto';
  }

  private readFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data: any = reader.result;
      this.usuario.foto = data.split(',')[1];

      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.usuario.foto
      );
    };
  }
}
