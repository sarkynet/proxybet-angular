import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public router: Router, public authService:AuthService) { }

  async login(){
    await this.authService.login();
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('')
    else alert('Invalid Credentials')
  }
}
