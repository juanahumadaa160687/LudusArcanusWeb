import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  count = this.carrito.length;

  /*
   * @params Recibe el ID del producto que se desea agregar al carrito.
   * @description Permite agregar un producto al carrito de compras si hay stock disponible. Actualiza el carrito en el almacenamiento local.
   * @returns Retorna true si el producto fue agregado al carrito, false si no se pudo agregar (por ejemplo, si no hay stock disponible).
   */
  buyProduct(id: number){

    let producto = this.productos.find((producto: any) => producto.id_producto === id);

    if (producto && producto.stock_producto > 0) {
      this.carrito.push(producto);

      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      return true;
    }

    return false;
  }

  /*
   * @params Recibe el ID del producto que se desea eliminar del carrito.
   * @description Permite eliminar un producto del carrito de compras. Actualiza el carrito en el almacenamiento local.
   * @returns Retorna true si el producto fue eliminado del carrito, false si no se pudo eliminar (por ejemplo, si el producto no estaba en el carrito).
   */
  deleteProduct(id: number){

    let producto = this.productos.find((producto: any) => producto.id_producto === id);

    if (producto) {

      this.carrito.splice(this.carrito.indexOf(producto), 1);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      return true
    }
    return false;
  }

  /*
   * @description Permite vaciar el carrito de compras eliminando todos los productos del mismo. Actualiza el carrito en el almacenamiento local y recarga la página para reflejar los cambios.
   */
  clearCart(): void {
    localStorage.removeItem('carrito');
    location.reload();
  }


}
