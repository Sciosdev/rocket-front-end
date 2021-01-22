import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSidebarService, NbMenuService, NbThemeService } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { RippleService } from 'src/app/core/utils/ripple.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly materialTheme$: Observable<boolean>;

  themes = [
    {
      value: 'material-light',
      name: 'Claro',
    },
    {
      value: 'material-dark',
      name: 'Oscuro',
    }
  ];

  currentTheme = 'default';

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private rippleService: RippleService,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
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
