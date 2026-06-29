import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart';

describe('ShoppingCart', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should add a product to the cart', () => {
    const product = { id_producto: 1, stock_producto: 10 };
    service.productos = [product];
    const result = service.buyProduct(1);

    expect(result).toBeTruthy()
    expect(service.carrito.length).toBe(1);
  });

  it('should remove a product from the cart', () => {
    const product = { id_producto: 1, stock_producto: 10 };
    service.productos = [product];
    const result = service.buyProduct(1);

    const deleteResult = service.deleteProduct(1);
    expect(deleteResult).toBeTruthy()
  })

});
