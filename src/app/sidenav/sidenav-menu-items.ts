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
    parent: 'Virtual Games',
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
    parent: 'Accounts',
    expanded:false,
    iconName: 'person',
    children: [{
      displayName: 'Profile',
      iconName: 'lock',
      route: '/user/profile',
      disabled: true
    },
    {
      displayName: 'LogOut',
      iconName: 'user-plus',
      route: '/user/profile',
      disabled: true
    }]
  }
  
];