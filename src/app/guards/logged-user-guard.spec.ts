import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {SignInService} from '../services/auth/sign-in';
import { loggedUserGuard } from './logged-user-guard';

describe('loggedUserGuard', () => {
  let mockAuthService: { isSignedIn: ReturnType<typeof vi.fn> };
  let mockRouter: { parseUrl: ReturnType<typeof vi.fn> };

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {
    mockAuthService = { isSignedIn: vi.fn() };
    mockRouter = { parseUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: SignInService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should be created', () => {
    expect(mockAuthService).toBeTruthy();
  });
});
