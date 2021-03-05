import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ThemeModule } from './theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';
import { AuthGuard } from './auth.guard';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './auth/role.provider';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxLoadingXConfig, NgxLoadingXModule, POSITION, SPINNER } from 'ngx-loading-x';
import { NbAuthJWTInterceptor } from './services/interceptors/NbAuthJWTInterceptot';
import { environment } from 'src/environments/environment';

const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgColor: 'rgba(40, 40, 40, 0.5)',
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.wanderingCubes,
  spinnerSize: 120,
  spinnerColor: '#ff7010',
  spinnerPosition: POSITION.centerCenter,
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
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
          baseEndpoint: environment.endpoint,
          login: {
            // ...
            endpoint: '/auth/login',
            method: 'POST',
            defaultMessages: ['Sesión iniciada satisfactoriamente'],
            defaultErrors: [
              'Combinación usuario/constraseña incorrecta, por favor intenta nuevamente.',
            ],
            redirect: {
              failure: '/auth/login',
              success: '/intranet/inicio',
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
              failure: '/intranet',
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
          view: ['guest'],
        },
        messenger: {
          parent: 'guest',
          menu: ['messenger'],
          view: ['messenger'],
        },
        customer: {
          parent: 'guest',
          menu: ['customer'],
          view: ['customer'],
        },
        admin: {
          parent: 'guest',
          menu: ['admin'],
          view: ['admin'],
        },
        full: {
          parent: 'admin',
        },
    }}),
  
  ],
  providers: [ThemeModule.forRoot().providers,
    AuthGuard,
    {provide: NbRoleProvider, useClass: RoleProvider},
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: function (req: HttpRequest<any>) {
        console.log(req.url);
        if (req.url === environment.endpoint + '/auth/login') {

          return true;
        }
        return false;
      },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }