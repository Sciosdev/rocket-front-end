import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaLayoutComponent } from './carga-layout.component';
import { ThemeModule } from '../../theme/theme.module';
import { MaterialModule } from '../../material/material.module';
import { CargaArchivoComponent } from './carga-archivo/carga-archivo.component';
import { PrevisualizacionComponent } from './previsualizacion/previsualizacion.component';
import { PrettyPrintJsonPipe } from 'src/app/pipes/pretty-print-json.pipe';
import { NgxJsonViewerModule } from 'ngx-json-viewer';



@NgModule({
  declarations: [CargaLayoutComponent, CargaArchivoComponent, PrevisualizacionComponent, PrettyPrintJsonPipe],
  imports: [
    CommonModule,
    ThemeModule,
    MaterialModule,
    NgxJsonViewerModule
  ]
})
export class CargaLayoutModule { }
