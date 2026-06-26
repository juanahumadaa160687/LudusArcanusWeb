import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosCartas } from './juegos-cartas';

describe('JuegosCartas', () => {
  let component: JuegosCartas;
  let fixture: ComponentFixture<JuegosCartas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosCartas],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosCartas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
