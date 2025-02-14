import { CanActivateFn } from '@angular/router';

export const routesActivationGuard: CanActivateFn = (route, state) => {
  return true;
};
