import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';

import { Estatus } from 'src/app/models/estatus.model';
import { Registro } from 'src/app/models/registro.model';
import { RegistroTable } from 'src/app/models/registro.table.model';
import { ScheduleServiceInDto } from 'src/app/models/ScheduleServiceInDto.model';
import { EstatusService } from 'src/app/services/estatus.service';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';
import { ScheduleComponent } from '../popups/schedule/schedule.component';

@Component({
  selector: 'app-resultado-consulta',
  templateUrl: './resultado-consulta.component.html',
  styleUrls: ['./resultado-consulta.component.scss']
})
export class ResultadoConsultaComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() registros: RegistroTable[];
  @Input() vendor;
  @Input() sEstatus: Estatus;

  @Output() regis:any = new EventEmitter<RegistroTable[]>();
  @Output() loading:any = new EventEmitter<boolean>();

  columns;

  displayedColumns: string[];
  dataSource;

  initialSelection: RegistroTable[] = [];
  allowMultiSelect = true;
  selection: SelectionModel<any>;
  ToBeScheduled: RegistroTable[] = [];
  constructor(public accessChecker: NbAccessChecker,
    private dialogService: NbDialogService,
    private registroService: RegistroService,
    private estatusService: EstatusService,
    protected cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar) {
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    if (this.canRender("filtro", ["customer"]))
      this.columns = ['select', 'OrderKey', 'Name', 'Email', 'Shipping City', 'Shipping Address 1', 'Shipping Address 2', 'Status', 'CargaDT', 'Scheduled'];
    else
      this.columns = ['OrderKey', 'Name', 'Email', 'Shipping City', 'Shipping Address 1', 'Shipping Address 2', 'Status', 'CargaDT', 'Scheduled'];
    this.displayedColumns = this.columns;
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.registros);
    this.dataSource.paginator = this.paginator;
    this.selection.clear();
    this.ToBeScheduled = [];
    if (this.canRender("filtro", ["customer"]))
      this.columns = ['select', 'OrderKey', 'Name', 'Email', 'Shipping City', 'Shipping Address 1', 'Shipping Address 2', 'Status', 'CargaDT', 'Scheduled'];
    else
      this.columns = ['OrderKey', 'Name', 'Email', 'Shipping City', 'Shipping Address 1', 'Shipping Address 2', 'Status', 'CargaDT', 'Scheduled'];
    this.displayedColumns = this.columns;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  solicitarAgenda() {
    this.dialogService.open(ScheduleComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'Enter template name'
      },
    })
      .onClose.subscribe(fecha => {
        if (fecha != undefined) {
          this.selection.selected.forEach(element => {
            element.scheduledDt = fecha;

            if (!this.ToBeScheduled.includes(element)) {
              this.ToBeScheduled.push(element);
            }

          })
        }

        this.selection.clear();
      });
  }

  limpiarAgenda() {
    this.ToBeScheduled.forEach(element => {
      element.scheduledDt = null;
    })

    this.ToBeScheduled = [];
    this.selection.clear();
  }

  procesarAgenda() {
    this.loading.emit(true);
    let agenda: ScheduleServiceInDto[] = [];

    this.ToBeScheduled.forEach(registro => {
      let scheduleServiceInDto: ScheduleServiceInDto = {};
      scheduleServiceInDto.orderkey = registro.orderkey;
      scheduleServiceInDto.scheduledDate = registro.scheduledDt.toLocaleDateString() + ' ' + registro.scheduledDt.toLocaleTimeString();
      scheduleServiceInDto.vendor = this.vendor;

      agenda.push(scheduleServiceInDto);
    });

    this.registroService.actualizarRegistros(agenda).subscribe(response => {
      console.log(response);
      this.limpiarAgenda();
      this.registros = null;
      this.regis.emit(this.registros);
      this.loading.emit(false);
      this._snackBar.open("Registros actualizados correctamente", "Éxito", {
        duration: 2000,
      });
    }, error => {
      this.limpiarAgenda();
      this.registros = null;
      this.regis.emit(this.registros);
      this.loading.emit(false);
      this._snackBar.open("Ocurrio un error", "Error", {
        duration: 2000,
      });
    })
  }

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

  canRender(permission, resources: any[]) {
    if (this.hasAccess(permission, resources)) {
      return this.sEstatus.tipo === "inicial";
    } else {
      return false;
    }
  }
}
