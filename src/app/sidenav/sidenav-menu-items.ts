import { NavItem } from './sidenav-prototype';

export const navItems: NavItem[] = [
  {
    parent: 'Home',
    expanded:false,
    iconName: 'home',
    route: ''
  },
  
  {
    parent: 'Tickets',
    expanded:false,
    iconName: 'dns',
    route: 'tickets'
  },

  {
    parent: 'Wallets',
    expanded:false,
    iconName: 'account_balance_wallet',
    route: 'wallets'
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