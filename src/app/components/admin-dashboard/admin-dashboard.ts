import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';
import {passwordNotMatchValidator, emailExistsValidator, imagenProductoExtension} from '../../functions/validators';
import {SignUpService} from '../../services/sign-up/sign-up-service';
import {DashboardService} from '../../services/admin/dashboard-service';
import {formatoCLP} from '../../functions/currencyFormat';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  //@description Formulario para ingresar un nuevo administrador
  adminForm!: FormGroup;

  //@description Formulario para ingresar un nuevo producto
  productosForm!: FormGroup;

  //@description Formulario para editar un producto
  editProductosForm!: FormGroup;

  /*
  * @description ID del producto, se obtiene a partir del número de productos almacenados en el localStorage.
  * De esta forma el ID se genera de forma dinámica.
  */
  productoId: number = JSON.parse(localStorage.getItem('productos') || '[]').length + 1;

  productos = JSON.parse(localStorage.getItem('productos') || '[]')

  /*
   * @description Variable de tipo booleano para mostrar u ocultar la contraseña en el formulario de registro de administrador.
   */
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder, protected signUpService: SignUpService, private dashboardService: DashboardService) {

    /*
     * @description Formulario para ingresar un nuevo administrador y sus respectivos validadores
     * Validadores personalizados:
     * emailExistsValidator: Verifica si el correo electrónico ingresado ya existe. Devuelve true si el email existe o null si no existe.
     * passwordNoMatchValidator: Verifica si las contraseñas ingresadas no coinciden. Devuelve true si las contraseñas no coinciden o null si coinciden.
     */
    this.adminForm = this.formBuilder.group({
      adminNombre: ['', Validators.required],
      adminApellido: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email, emailExistsValidator()]],
      adminPassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')]],
      adminConfirmPassword: ['', [Validators.required, passwordNotMatchValidator()]],
    });

    /*
     * @description Formulario para ingresar un nuevo producto y sus respectivos validadores
     * Validador personalizado:
     * imagenProductoExtension: Verifica si la imagen del producto tiene una extensión válida (webp). Devuelve true si la extensión es válida o null si no lo es.
     */
    this.productosForm = this.formBuilder.group({
      id_producto: [''],
      nombre_producto: ['', Validators.required],
      categoria_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      precio_producto: ['', Validators.required],
      stock_producto: ['', Validators.required],
      imagen_producto: ['', [Validators.required, imagenProductoExtension()]]
    })

    /*
     * @description Formulario para ingresar un nuevo producto y sus respectivos validadores
     * Validador personalizado:
     * imagenProductoExtension: Verifica si la imagen del producto tiene una extensión válida (webp). Devuelve true si la extensión es válida o null si no lo es.
     */
    this.editProductosForm = this.formBuilder.group({
      id_producto: [''],
      nombre_producto: ['', Validators.required],
      categoria_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      precio_producto: ['', Validators.required],
      stock_producto: ['', Validators.required],
      imagen_producto: ['', [Validators.required, imagenProductoExtension()]]
    });
  }

  ngOnInit() {

    /*
     * @description Inicializa la tabla de productos con DataTables y sus respectivas configuraciones
     * Configuraciones:
     * searching: Habilita la búsqueda en la tabla
     * paging: Habilita la paginación en la tabla
     * ordering: Habilita el ordenamiento de las columnas
     * responsive: Habilita la respuesta de la tabla a diferentes tamaños de pantalla
     * columns: Define las columnas de la tabla y sus títulos
     * data: Define los datos que se mostrarán en la tabla, en este caso los productos vienen desde un archivo data.ts, pero también pueden venir desde el localStorage.
     */
    let table = new DataTable('#adminTable', {
      searching: true,
      paging: true,
      ordering: true,
      responsive: true,
      columns: [
        {title: 'ID'},
        {title: 'Nombre'},
        {title: 'Categoria'},
        {title: 'Descripcion'},
        {title: 'Precio'},
        {title: 'Stock'},
        {title: 'Acciones'},
      ],
      data:
        this.productos.map((item: any) => {
          return[
            item.id_producto,
            item.nombre_producto,
            item.categoria_producto == 'juegos-mesa' ? 'Juegos de Mesa' : item.categoria_producto == 'juegos-cartas' ? 'Juegos de Cartas' : 'Juegos de Rol',
            item.descripcion_producto,
            formatoCLP.format(item.precio_producto),
            `<span class="badge border border-light ${item.stock_producto >= 10 ? 'bg-success' : item.stock_producto >= 5 ? 'bg-warning' : 'bg-danger'}">${item.stock_producto}</span>`,
            `<button type="button" class="btn btn-danger" (click)="dashboardService.deleteProducto(${item.id_producto})"><i class="bi bi-trash"></i></button>`
          ]
        })
    });
  }

  /*
   * @description Función que se ejecuta al enviar el formulario de registro de administrador.
   * Verifica si el formulario tiene errores y si no los tiene, llama al servicio para agregar un nuevo administrador.
   * Si el formulario no es válido, muestra un mensaje de advertencia.
   *
   */
  onSubmit() {

    if (this.adminForm.errors == null) {

      /*
       * @description Llama al servicio para agregar un nuevo administrador con los valores del formulario.
       */

     let new_admin = this.dashboardService.newAdmin(
                                this.adminForm.value.adminNombre,
                                this.adminForm.value.adminApellido,
                                this.adminForm.value.adminEmail,
                                this.adminForm.value.adminPassword
                              );

     if (new_admin) {
       Swal.fire({
         icon: 'success',
         title: 'Administrador agregado con éxito',
         text: 'El nuevo administrador ha sido agregado exitosamente.',
         theme: 'dark'
       }).then(() => {
         location.reload();
       })
     }

    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos correctamente.',
        theme: 'dark',
        timer: 3500,
      }).then(() => {
        location.reload();
      })
    }
  }

  /*
   * @description Función que se ejecuta al enviar el formulario de registro de producto.
   * Verifica si el formulario tiene errores y si no los tiene, llama al servicio para agregar un nuevo producto.
   * Si el formulario no es válido, muestra un mensaje de advertencia.
   *
   */
  onSubmitProduct(){

    if (this.productosForm.errors == null) {

      let new_producto = this.dashboardService.newProducto(
                                this.productosForm.value.id_producto,
                                this.productosForm.value.nombre_producto,
                                this.productosForm.value.categoria_producto,
                                this.productosForm.value.descripcion_producto,
                                this.productosForm.value.precio_producto,
                                this.productosForm.value.stock_producto,
                                this.productosForm.value.imagen_producto
                              );

      if (new_producto) {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado con éxito',
          text: 'El nuevo producto ha sido agregado exitosamente.',
          theme: 'dark'
        }).then(() => {
          location.reload();
        })
      }

    }
    else {

      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos correctamente.',
        theme: 'dark',
        timer: 3500,
      }).then(() => {
        location.reload();
      })
    }
  }

  /*
   * @param id del producto.
   *
   * @description Función que se ejecuta al eliminar un producto.
   * Llama al servicio para eliminar el producto y si lo elimina, muestra un mensaje de éxito.
   */
  deleteProducto(id: number) {

    let deleted_product = this.dashboardService.deleteProducto(id);

    if (deleted_product) {

      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado exitosamente',
        theme: 'dark'
      }).then(() => {
        location.reload();
      });
    }
  }

}
