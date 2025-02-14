import { CanActivateFn } from '@angular/router';

export const authDeactivationGuard: CanActivateFn = (route, state) => {
  return true;
};
