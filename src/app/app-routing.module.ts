import { ErrorHandler, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ViewTicketComponent } from './features/tickets/view-ticket/view-ticket.component';
import { ListTicketsComponent } from './features/tickets/list-tickets/list-tickets.component';
import { BetsComponent } from './features/bets/bets.component';
import { WalletComponent } from './features/wallet/wallet.component';
import { WalletDialogComponent } from './features/wallet/wallet-dialog/wallet-dialog.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { FundComponent } from './features/payments/fund/fund.component';
import { WithdrawComponent } from './features/payments/withdraw/withdraw.component';
import { CoinsComponent } from './features/payments/coins/coins.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "tickets", 
    children: [{
      path: '',
      component: ListTicketsComponent
    }, {
      path: 'stake',
      component: BetsComponent
    }, {
      path: 'view',
      component: ViewTicketComponent
    }]},
  {path: "my-bets", component: BetsComponent},
  {path: "wallets", 
    children: [{
      path: '',
      component: WalletComponent
    }, {
      path: 'create',
      component: WalletComponent
    }, {
      path: 'view',
      component: ViewTicketComponent
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
  {
    path: 'dashboard',
    redirectTo: ({ queryParams }) => {
      const errorHandler = inject(ErrorHandler);
      const adminParam = queryParams['admin'];
      if (adminParam === 'true') {
        return `admin`;
      } else if (adminParam === 'false') {
        return ``;
      } else {
        errorHandler.handleError(new Error(
          'Attempted navigation to dashboard without specifying user status.'
        ));
        return `not-found`;
      }
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
