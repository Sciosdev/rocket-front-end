import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaLayoutComponent } from './carga-layout.component';
import { ThemeModule } from '../../theme/theme.module';
import { MaterialModule } from '../../material/material.module';
import { CargaArchivoComponent } from './carga-archivo/carga-archivo.component';



@NgModule({
  declarations: [CargaLayoutComponent, CargaArchivoComponent],
  imports: [
    CommonModule,
    ThemeModule,
    MaterialModule
  ]
})
export class CargaLayoutModule { }
