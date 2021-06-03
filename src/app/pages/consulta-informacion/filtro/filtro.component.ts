import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { Estatus } from 'src/app/models/estatus.model';
import { RegistroTable } from 'src/app/models/registro.table.model';
import { EstatusService } from 'src/app/services/estatus.service';
import { RegistroService } from 'src/app/services/registro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit, OnChanges {

  @Output() registros: any = new EventEmitter<RegistroTable[]>();
  @Output() loading: any = new EventEmitter<boolean>();
  @Output() vendor: any = new EventEmitter<String>();
  @Output() sEstatus: any = new EventEmitter<Estatus>();

  users_combo: any[] = [];
  range: NbCalendarRange<Date>;
  checked: boolean = false;
  estatus: any[] = [];
  selectedEstatus: Estatus;

  selectFormControl = new FormControl('', Validators.required);
  usuarioFormControl = new FormControl('', Validators.required);
  adminFormControl = new FormControl('', Validators.required);
  isAdmin: boolean;
  access: boolean;
  selectedVendor;

  constructor(public accessChecker: NbAccessChecker,
    private authService: NbAuthService,
    private registroService: RegistroService,
    private usuarioService: UsuarioService,
    private estatusService: EstatusService,
    protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.monthStart,
      end: this.monthEnd,
    };
  }
  ngOnChanges(): void {
    this.authService.isAuthenticatedOrRefresh().subscribe(
      authenticated => {
        if (authenticated) {
          this.authService.getToken().subscribe(
            (token: NbAuthOAuth2JWTToken) => {
              if (token.isValid()) {
                let user = token.getAccessTokenPayload();
                this.loggedUser = user.user_name;
                this.usuarioFormControl.setValue(user.fullname);
                this.isAdmin = this.hasAccess('filtro',['admin']);
              }
            }
          );
        }
      }
    );


  }

  get monthStart(): Date {
    return this.dateService.today();
  }

  get monthEnd(): Date {
    return this.dateService.addDay(new Date(), 1);
  }

  ngOnInit(): void {

    this.usuarioFormControl.disable();
    this.estatusService.obtenerEstatus().subscribe(
      (resp: Estatus[]) => {
        this.estatus = resp;
      }
    );

    this.usuarioService.obtenerRepartidores().subscribe(
      (resp: any[]) => {
        resp.forEach(element => {
          this.users_combo.push(element);
        })
      }
    );
    this.usuarioService.obtenerVendedores().subscribe(
      (resp: any[]) => {
        resp.forEach(element => {
          this.users_combo.push(element);
        })
      }
    );


    this.authService.isAuthenticatedOrRefresh().subscribe(
      authenticated => {
        if (authenticated) {
          this.authService.getToken().subscribe(
            (token: NbAuthOAuth2JWTToken) => {
              if (token.isValid()) {
                let user = token.getAccessTokenPayload();
                this.loggedUser = user.user_name;
                this.usuarioFormControl.setValue(user.fullname);
                this.isAdmin = this.hasAccess('filtro',['admin']);
              }
            }
          );
        }
      }
    );

   
  }

  loggedUser: any;

  hasAccess(permission, resources: any[]) {
    let access = false;
    resources.forEach(element => {
      this.accessChecker.isGranted(permission, element).subscribe(granted => {
        if (granted)
          access = true;
      });
    });

    return access;
  }

  validateInput() {
    if (!this.isAdmin) {
      return this.usuarioFormControl.hasError("required") || this.selectFormControl.hasError("required");
    } else {
      return this.adminFormControl.hasError("required") || this.selectFormControl.hasError("required");
    }
  }

  obtenerRegistros() {
    this.loading.emit(true);
    
    if(!this.isAdmin){
      this.selectedVendor = this.loggedUser;
    }
    
    this.vendor.emit(this.selectedVendor);

    if (this.checked) {

      if (this.range.start == undefined || this.range.end == undefined) {
        this.loading.emit(false);
        Swal.fire('Error', 'Por favor asegurese que el rango de fechas es correcto', 'error');

      } else {
        this.registroService.obtenerRegistrosPorFecha(this.selectedVendor, this.range.start, this.range.end, this.selectedEstatus.id).subscribe(
          (response: RegistroTable[] )=> {
            this.sEstatus.emit(this.selectedEstatus);
            this.registros.emit(response);
            this.loading.emit(false);
          }
        );
      }


    } else {
      this.registroService.obtenerRegistros(this.selectedVendor, this.selectedEstatus.id).subscribe(
        (response: RegistroTable[] ) => {
          this.sEstatus.emit(this.selectedEstatus);
          this.registros.emit(response);
          this.loading.emit(false);
        }
      )
    }

  }
}
