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
import { CreateTicketComponent } from '../tickets/create-ticket/create-ticket.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "tickets", 
    children: [{
      path: '',
      component: ListTicketsComponent
    }, {
      path: ':_id/stake',
      component: BetsComponent
    }, {
      path: 'view/:_id',
      component: ViewTicketComponent
    }, {
      path: 'create',
      component: CreateTicketComponent
    }]
  },
  {path: "my-bets", component: BetsComponent},
  {path: "wallets", 
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
  {path: "payments", 
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
  {path: "user", 
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
  },
  {
    path: 'admin',
    // redirectTo: ({ queryParams }) => {
    //   const errorHandler = inject(ErrorHandler);
    //   const adminParam = queryParams['admin'];
    //   if (adminParam === 'true') {
    //     return `admin`;
    //   } else if (adminParam === 'false') {
    //     return ``;
    //   } else {
    //     errorHandler.handleError(new Error(
    //       'Attempted navigation to dashboard without specifying user status.'
    //     ));
    //     return `not-found`;
    //   }
    // },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AdminModule { }