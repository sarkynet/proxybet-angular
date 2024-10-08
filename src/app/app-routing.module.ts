import { ErrorHandler, NgModule, inject } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
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
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuardService } from './features/auth/auth-guard.service';

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
      path: ':_id/stake',
      component: BetsComponent
    }, {
      path: 'view/:_id',
      component: ViewTicketComponent
    }]//,
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService]
  },
  {
    path: "my-bets", 
    component: BetsComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService]
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
    }]//,
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService]
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
    }]//,
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService]
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
    }]//,
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService]
  },
  {
    path: 'auth',
    children: [{
      path: 'login',
      component: LoginComponent
    }]
  },
  {
    path: 'admin',
    loadChildren:() => import('./features/admin/admin-routing.module').then(m => m.AdminModule),
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService]
  }
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
    // }//,
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
