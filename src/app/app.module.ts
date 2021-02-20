import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ThemeModule } from './theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
} from '@nebular/auth';
import { AuthGuard } from './auth.guard';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './auth/role.provider';
import { PrettyPrintJsonPipe } from './pipes/pretty-print-json.pipe';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxJsonViewerModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    MaterialModule,
    ThemeModule,
    NgbModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://18.221.76.172:8443',
          login: {
            // ...
            endpoint: '/jwtdemo-1/userp',
            method: 'POST',
            defaultMessages: ['Sesión iniciada satisfactoriamente'],
            defaultErrors: [
              'Combinación usuario/constraseña incorrecta, por favor intenta nuevamente.',
            ],
            redirect: {
              failure: '/auth/login',
              success: '/pages/home',
            },
          },
          register: {
            // ...
            endpoint: '/api/auth/new',
            method: 'POST',
            defaultMessages: ['Usuario registrado satisfactoriamente'],
            // defaultErrors: [
            //   'Combinación usuario/constraseña incorrecta, por favor intenta nuevamente.',
            // ],
            redirect: {
              failure: '/auth/register',
              success: '/auth/login',
            },
          },
          logout: {
            requireValidToken: true,

            redirect: {
              failure: '/pages',
              success: '/auth/login',
            },
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
        }),
      ],
      forms: {
        logout: {
          redirectDelay: 500,
          strategy: 'email',
        },
        register: {
          redirectDelay: 500,
        },
      },
    }),
    FontAwesomeModule,
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          menu: ['guest'],
          view: ['home'],
        },
        messenger: {
          parent: 'guest',
          menu: ['user'],
        },
        customer: {
          parent: 'guest',
          menu: ['user'],
          view: ['layout'],
        },
        admin: {
          parent: 'guest',
          menu: ['admin'],
          view: ['layout'],
        },
        full: {
          parent: 'admin',
        },
    }}),
  
  ],
  providers: [ThemeModule.forRoot().providers,
    AuthGuard,
    {provide: NbRoleProvider, useClass: RoleProvider}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }