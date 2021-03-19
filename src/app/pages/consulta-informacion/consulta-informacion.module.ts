import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaInformacionComponent } from './consulta-informacion.component';
import { FiltroComponent } from './filtro/filtro.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ResultadoConsultaComponent } from './resultado-consulta/resultado-consulta.component';
import { TableModule } from 'primeng/table';
import { NbDatepickerModule } from '@nebular/theme';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { ScheduleComponent } from './popups/schedule/schedule.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [ConsultaInformacionComponent, FiltroComponent, ResultadoConsultaComponent, ScheduleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule,
    TableModule,
    NbDatepickerModule.forRoot(),
    NgxLoadingXModule,
    CalendarModule
  ]
})
export class ConsultaInformacionModule { }
