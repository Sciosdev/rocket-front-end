import { NbMenuItem } from '@nebular/theme';

export const admin_menu: NbMenuItem[] = [
    {
        title: 'Menu',
        group:true,
        data: {
            permission: 'menu',
            resource: 'guest'
          },
    },
    {
        title: 'Inicio',
        icon: 'home',
        link: '/pages/home',
        home: true,
        data: {
            permission: 'menu',
            resource: 'guest'
          },
    },
    {
      title: 'Carga de layout',
      icon: 'upload-outline',
      link: '/pages/layout',
      data: {
        permission: 'menu',
        resource: 'admin'
      },
    },
];