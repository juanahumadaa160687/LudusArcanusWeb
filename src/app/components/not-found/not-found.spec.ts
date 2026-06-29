import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound } from './not-found';
import {ActivatedRoute} from '@angular/router';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { id: null } } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
  });

  /*
   * @description
   * Test case to check if the NotFound component is created successfully.
   */
  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

});
