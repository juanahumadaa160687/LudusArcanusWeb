import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCart } from './shopping-cart';
import {ActivatedRoute} from '@angular/router';


describe('ShoppingCart', () => {
  let component: ShoppingCart;
  let fixture: ComponentFixture<ShoppingCart>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCart],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id_producto: 1}}}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCart);
    component = fixture.componentInstance;

  });

  /*
   * @description Verifica si el componente se crea correctamente.
   */
  it('should create the component instance', () => {

    expect(component).toBeTruthy()

  })

});
