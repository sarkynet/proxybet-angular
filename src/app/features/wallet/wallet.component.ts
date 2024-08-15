import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';

// const dialog = inject(MatDialog);
export interface Wallet {
  _id: string;
  name: string;
  amount: number;
  status: boolean;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})

export class WalletComponent {
  wallets!: Wallet[];
  wallet!: Wallet;
  page = "";
  @Input('_id') walletId = '';

  constructor(
    public dialog: MatDialog, public router: Router, public walletService:WalletService
  ) {}

  ngOnInit(){
    // console.log(this.router.url);
    this.page = this.router.url
    this.wallets = this.walletService.getWallets()
    console.log(this.page);
    
  }

  createWallet(wallet:any) {
    wallet = wallet.value;
    wallet.status = true;
    console.log(wallet);
    this.walletService.saveWallet(wallet);
    this.router.navigateByUrl('/wallets')
  }

  fundWallet(amount:any){
    amount = amount.value;
    console.log(amount);
    for (let index = 0; index < this.wallets.length; index++) {
      const element = this.wallets[index];
      if (element._id == this.walletId) {
        this.wallets[index].amount = amount.amount
        this.walletService.updateWallets(this.wallets)
        this.router.navigateByUrl('/wallets')
        return;
      }
    }
  }

  deleteWallet(id:string){
    for (let index = 0; index < this.wallets.length; index++) {
      const element = this.wallets[index];
      if (element._id == id) {
        this.wallets.splice(index, 1)
        this.walletService.updateWallets(this.wallets)
        return;
      }
    }
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

