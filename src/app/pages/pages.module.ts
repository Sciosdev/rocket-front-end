import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { NotFoundModule } from './not-found/not-found.module';

import {
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbMenuModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../theme/theme.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeModule,
    NotFoundModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    ThemeModule,
    NbCardModule,
    NgxSpinnerModule
    ],
  providers: []
})
export class PagesModule { }
