import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbCardModule, NbProgressBarModule, NbSpinnerModule } from '@nebular/theme';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    MaterialModule,
    NbSpinnerModule
  ]
})
export class HomeModule { }
