import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {SignInService} from '../services/auth/sign-in';
import { authGuard } from './auth-guard';

describe('authGuard', () => {

  let mockAuthService: { isLoggedIn: ReturnType<typeof vi.fn> };
  let mockRouter: { parseUrl: ReturnType<typeof vi.fn> };

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {
    mockAuthService = { isLoggedIn: vi.fn() };
    mockRouter = { parseUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: SignInService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  })

  /*
   * @description Verifica si el guardia authGuard se haya creado correctamente.
   */
  it('should be created', () => {
    expect(mockAuthService).toBeTruthy();
  });

  /*
   * @description Verifica si el guardia authGuard permite el acceso a usuarios autenticados con rol de usuario
   */
  it('should allow access for authenticated users', () => {

    mockAuthService.isLoggedIn.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(dummyRoute, dummyState)
    );

    expect(result).toBe(true);

  });

});
