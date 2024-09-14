import { DOCUMENT } from '@angular/common';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Input()
  localDB:any = document.defaultView
  DB:any = this.localDB?.localStorage
  constructor() { }

  login(){
    this.DB.setItem('isLoggedIn', true)
  }

  isLoggedIn(){
    return this.DB.getItem('isLoggedIn')
  }

  logout(){
    this.DB.setItem('isLoggedIn', false)
  }
}
