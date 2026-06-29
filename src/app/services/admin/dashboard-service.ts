import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  productos = JSON.parse(localStorage.getItem('products') || '[]');

  constructor(private router: Router) { }

  /*
   * @params Recibe los datos del nuevo administrador
   * @description Crea un nuevo administrador y lo guarda en el Array users, luego lo guarda en el localStorage.
   * @returns true si se creó correctamente.
   * @usageNotes Administrador tiene solo los datos necesarios comparado con un usuario normal, ya que no necesita datos como fecha de nacimiento, dirección o username.
   */
  newAdmin(nombre: string, apellido: string, email: string, password: string) {

    const newAdmin = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      role: 'administrador',
    };
    this.users.push(newAdmin);
    localStorage.setItem('users', JSON.stringify(this.users));

    return true;
  }

  /*
   * @params Recibe los datos del nuevo producto
   * @description Crea un nuevo producto y lo guarda en el Array productos, luego lo guarda en el localStorage.
   * @returns true si se creó correctamente.
   */
  newProducto(id_producto: number, nombre_producto: string, categoria_producto: string, descripcion_producto: string, precio_producto: number, stock_producto: number, imagen_producto: string) {

    let new_producto = {
      id_producto: id_producto,
      nombre_producto: nombre_producto,
      categoria_producto: categoria_producto,
      descripcion_producto: descripcion_producto,
      precio_producto: precio_producto,
      stock_producto: stock_producto,
      imagen_producto: imagen_producto,
    }

    this.productos.push(new_producto);
    localStorage.setItem('productos', JSON.stringify(this.productos));

   return true;

  }

  /*
   * @params Recibe el ID del producto a eliminar
   * @description Elimina un producto del Array productos, luego lo guarda en el localStorage.
   * @returns true si se eliminó correctamente.
   */
  deleteProducto(id_producto: number) {

    let producto = this.productos.find((producto: any) => producto.id_producto == id_producto);

    this.productos.splice(this.productos.indexOf(producto), 1);
    localStorage.setItem('productos', JSON.stringify(this.productos));

    return true;
  }

}
