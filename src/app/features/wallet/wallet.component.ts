import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';
import { Router } from '@angular/router';

// const dialog = inject(MatDialog);
export interface Wallet {
  name: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})

export class WalletComponent {
  wallets = [{}];
  wallet = {};
  page = "";

  constructor(
    public dialog: MatDialog, public router: Router 
  ) {}

  ngOnInit(){
    // console.log(this.router.url);
    this.page = this.router.url
  }

  createWallet(wallet:any) {
    this.wallets.push(wallet);
  }

  createWalletDialog(easein:string, easeout:string): void {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }

}

