import { ErrorHandler, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ViewTicketComponent } from '../tickets/view-ticket/view-ticket.component';
import { ListTicketsComponent } from '../tickets/list-tickets/list-tickets.component';
import { BetsComponent } from '../bets/bets.component';
import { WalletComponent } from '../wallet/wallet.component';
import { PaymentsComponent } from '../payments/payments.component';
import { FundComponent } from '../payments/fund/fund.component';
import { WithdrawComponent } from '../payments/withdraw/withdraw.component';
import { CoinsComponent } from '../payments/coins/coins.component';
import { CreateOneComponent } from './tickets/create-one/create-one.component';
import { CreateMultipleComponent } from './tickets/create-multiple/create-multiple.component';

const routes: Routes = [
  {
    path: "", 
    component: HomeComponent
  },
  {
    path: "tickets", 
    children: [{
      path: '',
      component: ListTicketsComponent
    }, {
      path: 'view/:_id',
      component: ViewTicketComponent
    }, {
      path: 'createOne',
      component: CreateOneComponent
    }, {
      path: 'createMultiple',
      component: CreateMultipleComponent
    }]
  },
  {
    path: "my-bets", 
    component: BetsComponent
  },
  {
    path: "wallets", 
    children: [{
      path: '',
      component: WalletComponent
    }, {
      path: 'create',
      component: WalletComponent
    }, {
      path: ':_id/edit',
      component: WalletComponent
    }]
  },
  {
    path: "payments", 
    children: [{
      path: '',
      component: PaymentsComponent
    }, {
      path: 'fund',
      component: FundComponent
    }, {
      path: 'withdraw',
      component: WithdrawComponent
    }, {
      path: 'coins',
      component: CoinsComponent
    }]
  },
  {
    path: "user", 
    children: [{
      path: ':_id/profile',
      component: FundComponent
    }, {
      path: ':_id/profile/edit',
      component: WithdrawComponent
    }, {
      path: 'coins',
      component: CoinsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule { }
