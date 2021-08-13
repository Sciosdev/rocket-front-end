import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { element } from 'protractor';
import { UsuarioCompleto } from 'src/app/models/usuario-completo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GlobalAcceptanceComponent } from '../../common-popups/global-acceptance/global-acceptance.component';
import { ModificarUsuarioComponent } from '../popups/modificar-usuario/modificar-usuario.component';

@Component({
  selector: 'app-resultado-consulta-usuarios',
  templateUrl: './resultado-consulta-usuarios.component.html',
  styleUrls: ['./resultado-consulta-usuarios.component.scss']
})
export class ResultadoConsultaUsuariosComponent implements OnInit, AfterViewInit {

  @Input() registros: Usuario[];
  @Output() loading: any = new EventEmitter<boolean>();

  columns: any[] = [];
  defaultColumns = ['Nombre', 'Rol', 'Tienda', 'Correo', 'Telefono', 'Acciones'];

  displayedColumns: string[];


  dataSource: MatTableDataSource<Usuario>;

  constructor(
    private dialogService: NbDialogService,
    private usuarioService: UsuarioService,
    private toastrService: NbToastrService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.registros);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.columns = [];
    this.columns.push(...this.defaultColumns);

    this.displayedColumns = this.columns;
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.registros);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.columns = [];
    this.columns.push(...this.defaultColumns);

    this.displayedColumns = this.columns;
  }

  modificarUsuario(usuario: Usuario) {
    this.usuarioService.obtenerUsuarioCompleto(usuario.username).subscribe((usuarioCompleto: UsuarioCompleto) => {
      this.dialogService
        .open(ModificarUsuarioComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: true,
          context: { usuario: usuarioCompleto }
        }).onClose.subscribe((response) => {

          if (response.usuario && response.accepted) {
            if (response.firstName) usuario.nombre = response.firstName;
          }

          this.dataSource = new MatTableDataSource(this.registros);
          this.dataSource.paginator = this.paginator;
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          console.log(response);
        })
    }, (error) => {
      console.error(error);
    })

  }


  eliminarUsuario(usuario: Usuario) {
    this.dialogService
      .open(GlobalAcceptanceComponent, {
        closeOnBackdropClick: false,
        closeOnEsc: true,
        context: {
          headerMessage: 'Eliminación de usuario',
          bodyMessage:
            '¿Desea eliminar el usuario: [' + usuario.nombre + ']?',
          acceptanceLabel: 'Si',
          cancelLabel: 'No',
        },
      })
      .onClose.subscribe((response) => {
        console.log(response);
        if (response.accept == true) {
          this.loading.emit(true);
          this.usuarioService.eliminarUsuario(usuario.username).subscribe(
            (response: any) => {
              if (response.response) {
                this.toastrService.success(response.responseMessage, 'Eliminación');
                this.registros = this.arrayRemove(this.registros, usuario);

                this.dataSource = new MatTableDataSource(this.registros);
                this.dataSource.paginator = this.paginator;
                if (this.dataSource.paginator) {
                  this.dataSource.paginator.firstPage();
                }
              } else {

                this.toastrService.danger(response.responseMessage, 'Eliminación');

              }

              this.loading.emit(false);
            },
            (error) => {
              this.toastrService.danger('El usuario no se pudo eliminar', 'Eliminación');
              this.loading.emit(false);
            }
          );
        }
      });
  }

  arrayRemove(arr: Usuario[], value: Usuario) {
    return arr.filter(function (ele) {
      return ele.id != value.id;
    });
  }
}
