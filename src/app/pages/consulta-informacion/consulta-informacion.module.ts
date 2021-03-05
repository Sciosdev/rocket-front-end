import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaInformacionComponent } from './consulta-informacion.component';
import { FiltroComponent } from './filtro/filtro.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';



@NgModule({
  declarations: [ConsultaInformacionComponent, FiltroComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule
  ]
})
export class ConsultaInformacionModule { }
