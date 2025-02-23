import { CanActivateFn, Router } from '@angular/router';
import { isNullOrUndefined } from '../common/utils';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LOGIN_PAGE } from '../common/appConstants';

export const authActicvationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const routeData = route.data;

  if(isNullOrUndefined(routeData) || isNullOrUndefined(routeData['allowedRoles'])) {
    return true;
  }

  if(authService.isLoggedIn() && routeData['allowedRoles'].includes(authService.getRole())) {
    return true;
  } else {
    router.navigateByUrl(LOGIN_PAGE);
    return false;
  }
};
