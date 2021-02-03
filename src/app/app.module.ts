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



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
          baseEndpoint: 'http://18.221.76.172:8080',
          login: {
            // ...
            endpoint: '/DemoAuthMongo/api/auth/login',
            method: 'POST',
            defaultMessages: ['Sesión iniciada satisfactoriamente'],
            defaultErrors: [
              'Combinación usuario/constraseña incorrecta, por favor intenta nuevamente.',
            ],
            redirect: {
              failure: '/auth/login',
              success: '/pages',
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
  ],
  providers: [ThemeModule.forRoot().providers,AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }