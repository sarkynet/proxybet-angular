import { NavItem } from './sidenav-prototype';

export const navItems: NavItem[] = [
  {
    parent: 'Home',
    expanded:false,
    iconName: 'home',
    children: [{
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: 'dashboard',
    }]
  },
  
  {
    parent: 'Ui Components',
    expanded:false,
    iconName: 'list',
    children: [{
      displayName: 'Badge',
      iconName: 'rosette',
      route: '/ui-components/badge',
      disabled: true
    },
    {
      displayName: 'Chips',
      iconName: 'poker-chip',
      route: '/ui-components/chips',
      disabled: true
    },
    {
      displayName: 'Lists',
      iconName: 'list',
      route: '/ui-components/lists',
      disabled: true
    },
    {
      displayName: 'Menu',
      iconName: 'layout-navbar-expand',
      route: '/ui-components/menu',
      disabled: true
    },
    {
      displayName: 'Tooltips',
      iconName: 'tooltip',
      route: '/ui-components/tooltips',
      disabled: true
    }]
  },

  {
    parent: 'Auth',
    expanded:false,
    iconName: 'person',
    children: [{
      displayName: 'Login',
      iconName: 'lock',
      route: '/authentication/login',
      disabled: true
    },
    {
      displayName: 'Register',
      iconName: 'user-plus',
      route: '/authentication/register',
      disabled: true
    }]
  },
  
  {
    parent: 'Extra',
    expanded:false,
    iconName: 'share',
    children: [
      {
        displayName: 'Icons',
        iconName: 'mood-smile',
        route: '/extra/icons',
        disabled: true
      },
      {
        displayName: 'Sample Page',
        iconName: 'aperture',
        route: '/extra/sample-page',
        disabled: true
      }
    ]
  }
  
];