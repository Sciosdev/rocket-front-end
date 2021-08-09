import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionTiendasComponent } from './gestion-tiendas.component';
import { FiltroConsultaTiendasComponent } from './filtro-consulta-tiendas/filtro-consulta-tiendas.component';
import { ResultadoConsultaTiendasComponent } from './resultado-consulta-tiendas/resultado-consulta-tiendas.component';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { ThemeModule } from 'src/app/theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [GestionTiendasComponent, FiltroConsultaTiendasComponent, ResultadoConsultaTiendasComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule,
    NgxLoadingXModule
  ]
})
export class GestionTiendasModule { }
