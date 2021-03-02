import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSidebarService, NbMenuService, NbThemeService } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { RippleService } from 'src/app/core/utils/ripple.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly materialTheme$: Observable<boolean>;

  user;

  themes = [
    {
      value: 'material-light',
      name: 'Claro',
    },
    {
      value: 'material-dark',
      name: 'Oscuro',
    },
    {
      value: 'material-dark-blue',
      name: 'Azul Oscuro',
    }
  ];

  currentTheme = 'default';

  userMenu = [
   
    { title: 'Cerrar sesión', link: '/auth/logout' },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private rippleService: RippleService,
    private authService: NbAuthService,
    private router: Router
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 

        }

      });
   }
  private destroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));});
  }

  /**
   * Funcion para mostrar u ocultar el sidebar
   */
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToLogin() {
    this.router.navigateByUrl("/auth/login");
  }
  /**
   * Redirecciona a home
   */
  goToHome() {
    this.menuService.navigateHome();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
}
