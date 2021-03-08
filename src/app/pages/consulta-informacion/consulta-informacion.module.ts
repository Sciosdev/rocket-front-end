import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaInformacionComponent } from './consulta-informacion.component';
import { FiltroComponent } from './filtro/filtro.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ResultadoConsultaComponent } from './resultado-consulta/resultado-consulta.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [ConsultaInformacionComponent, FiltroComponent, ResultadoConsultaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule,
    TableModule
  ]
})
export class ConsultaInformacionModule { }
