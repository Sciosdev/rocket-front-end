import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { UsuarioCompleto } from 'src/app/models/usuario-completo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModificarUsuarioComponent } from '../popups/modificar-usuario/modificar-usuario.component';

@Component({
  selector: 'app-resultado-consulta-usuarios',
  templateUrl: './resultado-consulta-usuarios.component.html',
  styleUrls: ['./resultado-consulta-usuarios.component.scss']
})
export class ResultadoConsultaUsuariosComponent implements OnInit, AfterViewInit {

  @Input() registros: Usuario[];

  columns: any[] = [];
  defaultColumns = ['Nombre', 'Correo', 'Telefono', 'Acciones'];

  displayedColumns: string[];


  dataSource: MatTableDataSource<Usuario>;

  constructor(
    private dialogService: NbDialogService,
    private usuarioService: UsuarioService
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
    this.usuarioService.obtenerUsuarioCompleto(usuario.username).subscribe((response: UsuarioCompleto) => {
      this.dialogService.open(ModificarUsuarioComponent, {
        closeOnBackdropClick: false, closeOnEsc: true, context: { usuario: response }
      }).onClose.subscribe((response) => {
        console.log(response);
      })
    }, (error) => {
      console.error(error);
    })

  }
}
