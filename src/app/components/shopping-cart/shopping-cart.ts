import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  total_final : number = 0;

  carrito_compras: any = JSON.parse(localStorage.getItem('carrito_compras') || '[]');

  constructor(private router: Router) {

  }

  ngOnInit() {


    this.carrito_compras.forEach((item: any) => {

      let precio = parseFloat(item.precio_producto);

      this.total_final += precio;

    });

  }

  deleteProduct(id: number) {

    const index = this.carrito_compras.findIndex((producto: any) => producto.id_producto === id);
    if (index !== -1) {
      this.carrito_compras.splice(index, 1);
      localStorage.setItem('carrito_compras', JSON.stringify(this.carrito_compras));
    }

    location.reload();

  }

  clearCart() {
    localStorage.removeItem('carrito_compras');
    location.reload();
  }

  generarPedido() {

    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

    let pedido = {
      id: pedidos.length + 1,
      fecha: new Date().toISOString().split('T')[0],
      precio: this.total_final,
      estado: 'Pendiente',
      productos: this.carrito_compras,
      usuario: sessionStorage.getItem('username'),
    }

    pedidos.push(pedido);

    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    Swal.fire({
      title: 'Pedido generado',
      text: 'Su pedido ha sido generado con éxito',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      this.router.navigate(['/home']);
    });

  }

}
