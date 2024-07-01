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
    parent: 'Payments',
    expanded:false,
    iconName: 'account_balance',
    route: 'payments',
    children: [
        {
          displayName: 'Fund Wallet',
          iconName: 'account_balance_wallet',
          route: '/payments/fund',
          disabled: true
        },
        {
          displayName: 'Withdraw Fund',
          iconName: 'account_balance_wallet',
          route: '/payments/withdraw',
          disabled: true
    }]
  },

  {
    parent: 'VIrtual Games',
    expanded:false,
    iconName: 'play',
    children: [{
      displayName: 'Moneycase',
      iconName: 'money',
      route: '',
      disabled: true
    },
    {
      displayName: 'Goobad Circles',
      iconName: 'user-plus',
      route: '',
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
  }
  
];