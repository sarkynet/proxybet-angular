import { ErrorHandler, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ViewTicketComponent } from './features/tickets/view-ticket/view-ticket.component';
import { ListTicketsComponent } from './features/tickets/list-tickets/list-tickets.component';
import { BetsComponent } from './features/bets/bets.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "tickets/view", component: ViewTicketComponent},
  {path: "tickets", component: ListTicketsComponent},
  {path: "tickets/stake", component: BetsComponent},
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
