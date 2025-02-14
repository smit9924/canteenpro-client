import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routesActivationGuard } from './routes-activation.guard';

describe('routesActivationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routesActivationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
