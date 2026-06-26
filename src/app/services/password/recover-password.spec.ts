import { TestBed } from '@angular/core/testing';

import { RecoverPassword } from './recover-password';

describe('RecoverPassword', () => {
  let service: RecoverPassword;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverPassword);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
