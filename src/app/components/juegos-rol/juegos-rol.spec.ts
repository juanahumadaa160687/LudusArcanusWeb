import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosRol } from './juegos-rol';

describe('JuegosRol', () => {
  let component: JuegosRol;
  let fixture: ComponentFixture<JuegosRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosRol],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosRol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
