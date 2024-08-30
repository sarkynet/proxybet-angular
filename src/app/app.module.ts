import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialsModule } from './materials/materials.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './features/home/home.component';
import { CreateTicketComponent } from './features/tickets/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './features/tickets/list-tickets/list-tickets.component';
import { ViewTicketComponent } from './features/tickets/view-ticket/view-ticket.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { LoginComponent } from './features/auth/login/login.component';
import { BetsComponent } from './features/bets/bets.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { WalletComponent } from './features/wallet/wallet.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { ResetComponent } from './features/auth/reset/reset.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { WalletDialogComponent } from './features/wallet/wallet-dialog/wallet-dialog.component';
import { FundComponent } from './features/payments/fund/fund.component';
import { WithdrawComponent } from './features/payments/withdraw/withdraw.component';
import { CoinsComponent } from './features/payments/coins/coins.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { NgxMatDateAdapter, NgxMatNativeDateAdapter } from '@angular-material-components/datetime-picker';
import { MAT_DATE_LOCALE, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { AdminModule } from './features/admin/admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    CreateTicketComponent,
    ListTicketsComponent,
    ViewTicketComponent,
    SignupComponent,
    LoginComponent,
    BetsComponent,
    PaymentsComponent,
    WalletComponent,
    ProfileComponent,
    ResetComponent,
    WalletDialogComponent,
    FundComponent,
    WithdrawComponent,
    CoinsComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
