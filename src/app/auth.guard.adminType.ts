import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services/services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdminType implements CanActivate {
  constructor(private authService: ServicesService, private router: Router) {}
  // BAckendToken: any = this.authService.getToken;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('token') != null) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
