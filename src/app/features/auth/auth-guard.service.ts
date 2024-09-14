import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

class UserToken {}
class Permissions {
  canActivate(): boolean {
    return true;
  }
} 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public authService:AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      
      const user = this.authService.isLoggedIn();
      if (user) return true;

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login']);
      return false;
  }
}