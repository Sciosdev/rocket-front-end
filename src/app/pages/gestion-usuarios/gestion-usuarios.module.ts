import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroConsultaComponent } from './filtro-consulta/filtro-consulta.component';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ResultadoConsultaUsuariosComponent } from './resultado-consulta-usuarios/resultado-consulta-usuarios.component';
import { NgxLoadingXModule } from 'ngx-loading-x';




@NgModule({
  declarations: [FiltroConsultaComponent, GestionUsuariosComponent, ResultadoConsultaUsuariosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule,
    NgxLoadingXModule
  ]
})
export class GestionUsuariosModule { }
