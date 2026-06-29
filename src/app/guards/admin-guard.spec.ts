import { TestBed } from '@angular/core/testing';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { adminGuard } from './admin-guard';
import {expect} from 'vitest';
import {State} from 'datatables.net-dt';
import {SignInService} from '../services/auth/sign-in';

describe('adminGuard', () => {

  let mockAdminService: {'isLoggedIn': ReturnType<typeof vi.fn>};
  let mockRouter: {parseUrl: ReturnType<typeof vi.fn>};

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {

    mockAdminService = { isLoggedIn: vi.fn() };
    mockRouter = { parseUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        {provide: SignInService, useValue: mockAdminService},
        {provide: Router, useValue: mockRouter}
      ]
    });
  });


  /*
   * @description Prueba que el guardia adminGuard se haya creado correctamente.
   */
  it('should create guard', () => {
    expect(adminGuard).toBeTruthy();
  });

  /*
   * @description Prueba que el guardia adminGuard permite el acceso a usuarios autenticados con rol de administrador.
   */
  it('should allow access for authenticated users with admin role', () => {

    mockAdminService.isLoggedIn.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => adminGuard(dummyRoute, dummyState));

    expect(result).toBe(true);

  });

});
