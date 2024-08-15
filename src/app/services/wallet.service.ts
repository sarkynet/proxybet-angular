import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  localDB:any = document.defaultView
  DB:any = this.localDB?.localStorage

  constructor() { }

  getWallets() {
    let Wallets:any;
    if (this.DB.getItem('Proxy-Wallets')) {
      Wallets = this.DB.getItem('Proxy-Wallets');
      Wallets = JSON.parse(Wallets);
      
      return Wallets;
    }
    else {
      Wallets = [{
        _id: this.uniqueRef(),
        name: "Main",
        amount: 0,
        status: true
      }, {
        _id: this.uniqueRef(),
        name: "Coins",
        amount: 1000,
        status: false
      }, {
        _id: this.uniqueRef(),
        name: "Bonus",
        amount: 0,
        status: false
      }];
      this.DB.setItem("Proxy-Wallets", JSON.stringify(Wallets));
      return Wallets;
    }
  }

  saveWallet(wallet:any) {
    let Wallets:any = this.getWallets()
    wallet._id = this.uniqueRef();
    Wallets.push(wallet)
    console.log(Wallets);
    this.DB.setItem('Proxy-Wallets', JSON.stringify(Wallets))
  }

  updateWallets(wallets:any){
    console.log(wallets);
    this.DB.setItem('Proxy-Wallets', JSON.stringify(wallets))
  }

  uniqueRef() {
    return Math.random().toString(16).slice(2);
  }
}
