import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroConsultaComponent } from './filtro-consulta/filtro-consulta.component';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ResultadoConsultaUsuariosComponent } from './resultado-consulta-usuarios/resultado-consulta-usuarios.component';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { ModificarUsuarioComponent } from './popups/modificar-usuario/modificar-usuario.component';
import { EliminarUsuarioComponent } from './popups/eliminar-usuario/eliminar-usuario.component';
import { PipesModule } from 'src/app/pipes/pipes.module';




@NgModule({
  declarations: [FiltroConsultaComponent, GestionUsuariosComponent, ResultadoConsultaUsuariosComponent, ModificarUsuarioComponent, EliminarUsuarioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ThemeModule,
    NgxLoadingXModule,
    PipesModule
  ]
})
export class GestionUsuariosModule { }
