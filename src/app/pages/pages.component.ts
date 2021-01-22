import { Component } from '@angular/core';
import { NbSidebarService, NbMenuService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  constructor( private sidebarService: NbSidebarService,
               private menuService: NbMenuService) {

  }

  MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Navegación',
      group: true,
    },
    {
      title: 'Inicio',
      icon: 'car-outline',
      link: '/pages/home',
      home: true
    },
  ];
  
  menu = this.MENU_ITEMS;

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  gotoHome() {
      this.menuService.navigateHome();
  }
}
