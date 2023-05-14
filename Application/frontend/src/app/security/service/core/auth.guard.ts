import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthStoreService} from "../store/auth-store.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthStoreService) {
    this.authService.authIsAuthenticated$
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
