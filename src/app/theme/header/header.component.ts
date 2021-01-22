import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSidebarService, NbMenuService, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  themes = [
    {
      value: 'dark',
      name: 'Oscuro',
    },
    {
      value: 'cosmic',
      name: 'Morado',
    },
    {
      value: 'default',
      name: 'Claro',
    },
  ];

  currentTheme = 'default';

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
  ) { }
  private destroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
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
