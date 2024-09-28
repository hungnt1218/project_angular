import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Inject, inject } from '@angular/core';
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
    return true;

  // const authService = inject(AuthService)
  // const router = inject(Router)

  // return authService.isLoggedIn().pipe(
  //   take(1),
  //   map((isLoggedIn: boolean) => {
  //     if(!isLoggedIn) {
  //       router.navigate(['/login']);
  //       return false;
  //     }
  //     return true;
  //   })
  // );
};
