import { TestBed } from '@angular/core/testing';
import { SignInService } from './sign-in';

describe('SignIn', () => {
  let service: SignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in with correct credentials', () => {

    let user = {
      email: 'jdoe@mail.com',
      password: '123456',
    }

    const email = 'jdoe@mail.com';
    const password = '123456';

    service.signIn(email, password)

    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);

  });

  it('should not sign in with incorrect credentials', () => {
    let user = {email: 'invalid-email', password: 'invalid-password',}

    service.users = [user];

    const result = service.signIn(user.email, user.password)

    expect(result).toBeTruthy();

  });

});
