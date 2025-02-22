import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard to deactivate AUTHENTICATION Routes 
export const authDeactivationGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  const authService = inject(AuthService);

  if(authService.isLoggedIn()) {
    return false;
  }
  return true;
};