import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroConsultaComponent } from './filtro-consulta/filtro-consulta.component';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ResultadoConsultaUsuariosComponent } from './resultado-consulta-usuarios/resultado-consulta-usuarios.component';




@NgModule({
  declarations: [FiltroConsultaComponent, GestionUsuariosComponent, ResultadoConsultaUsuariosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule
  ]
})
export class GestionUsuariosModule { }
