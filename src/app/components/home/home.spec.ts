import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import {ActivatedRoute} from '@angular/router';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {provide: ActivatedRoute, useValue: { snapshot: { params: { categoria: 'juegos-mesa' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  /*
   * @description Verifica si se crea el componente.
   */
  it('should create component instance', () => {
    expect(component).toBeTruthy();
  })

});
