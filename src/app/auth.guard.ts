import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router,private accessChecker: NbAccessChecker) {}
  canActivate(route: ActivatedRouteSnapshot) {
      let access = false;
      return this.authService.isAuthenticated().pipe(
      tap(authenticated => {

        if (!authenticated) {
          this.router.navigate(['auth/login']);
        } else {
          route.data['resource'].forEach(element => {   
            this.accessChecker.isGranted('view', element).subscribe(granted => {
              if(granted){
                access = true;
              }
            });
          });

          if(!access){
            this.router.navigate(['auth/login']);
          }
        }
      }),
    );
  }
}
