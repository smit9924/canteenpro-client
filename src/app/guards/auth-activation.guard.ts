import { CanActivateFn, Router } from '@angular/router';
import { isNullOrUndefined } from '../common/utils';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DASHBOARD_PAGE, LOGIN_PAGE, UPDATE_DEFAULT_PASSWORD_PAGE } from '../common/appConstants';
import { DataService } from '../services/data.service';

export const authActicvationGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const dataService = inject(DataService);
  const router = inject(Router);
  const routeData = route.data;

  if(isNullOrUndefined(routeData) || isNullOrUndefined(routeData['allowedRoles'])) {
    console.log('route data not provided. Making route public')
    return true;
  }

  if(authService.isLoggedIn()) {
    const userProfileData = await dataService.getUserProfileData();
    if(userProfileData?.defaultPasswordUpdated) {
      if(routeData['allowedRoles'].includes(authService.getRole())) {
        return true;
      } else {
        // TODO: Show popup with message: You haven't sufficient rights to access this page
        router.navigateByUrl(DASHBOARD_PAGE);
        return false;
      }
    } else {
      // restrict logged in user to access app if default password is not updated
      router.navigateByUrl(UPDATE_DEFAULT_PASSWORD_PAGE);
      return false;
    }
  } else {
    router.navigateByUrl(LOGIN_PAGE);
    return false;
  }
};
