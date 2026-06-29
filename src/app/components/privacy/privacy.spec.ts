import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Privacy } from './privacy';

describe('Privacy', () => {
  let component: Privacy;
  let fixture: ComponentFixture<Privacy>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ Privacy ]
    }).compileComponents();

    fixture = TestBed.createComponent(Privacy);
    component = fixture.componentInstance;
  });

  /*
   * @description Test para verificar que el componente se crea correctamente
   */
  it('should create component instance', () => {
    expect(component).toBeTruthy();
  })

});
