import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermnsConditions } from './termns-conditions';

describe('TermnsConditions', () => {
  let component: TermnsConditions;
  let fixture: ComponentFixture<TermnsConditions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermnsConditions],
    }).compileComponents();

    fixture = TestBed.createComponent(TermnsConditions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
