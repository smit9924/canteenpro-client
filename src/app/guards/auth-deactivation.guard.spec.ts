import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authDeactivationGuard } from './auth-deactivation.guard';

describe('authDeactivationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authDeactivationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
