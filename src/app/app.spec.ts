import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import {describe} from 'vitest';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {provide: ActivatedRoute, useValue: {
          snapshot: { params: { user_email: 'jdoe@mail.com' } },
          }},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

});
