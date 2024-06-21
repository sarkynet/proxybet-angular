import { ErrorHandler, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
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
