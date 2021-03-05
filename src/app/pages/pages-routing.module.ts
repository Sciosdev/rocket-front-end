import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CargaLayoutComponent } from './carga-layout/carga-layout.component';
import { AuthGuard } from '../auth.guard';
import { ConsultaInformacionComponent } from './consulta-informacion/consulta-informacion.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'inicio',
      component: HomeComponent,
    },
    {
      path: 'carga-layout',
      component: CargaLayoutComponent,
      data: {
        resource: ['admin'],
      },
      canActivate: [AuthGuard],
    },
    {
      path: 'consulta-registros',
      component: ConsultaInformacionComponent,
      canActivate: [AuthGuard],
      data: {
        resource: ['messenger', 'customer', 'admin'],
      },
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
