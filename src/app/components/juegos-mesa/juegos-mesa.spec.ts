import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosMesa } from './juegos-mesa';

describe('JuegosMesa', () => {
  let component: JuegosMesa;
  let fixture: ComponentFixture<JuegosMesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosMesa],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosMesa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
